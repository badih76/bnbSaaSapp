'use client'
import { fileToDataUri, resizeImage } from '@/lib/thumbnailsComponent';
import { IFilesUploadType } from '@/lib/thumnailsInterface';
import { Trash2 } from 'lucide-react';
import React, { useRef, useState } from 'react'

function ThumnailsComponent({ 
    customComponentClassName = "border border-gray-300 p-5 w-full bg-gray-200",
}: {
    customComponentClassName?: string,
}) {

    const gridClassName = "mt-5 p-2 flex flex-row flex-wrap gap-3 border border-gray-500 w-full"

    const imgFileRef = useRef<HTMLInputElement>(null);
    const imgToResizeRef = useRef<HTMLImageElement>(null);
    const resizedImgRef = useRef<HTMLImageElement>(null);
    const imgDivRef = useRef<HTMLDivElement>(null);
    const [ resizedImageFile, setResizedImageFile ] = useState<IFilesUploadType[]>([]);
    // const [ resizeImageFilesStringify, setResizeImageFilesStringify ] = useState('');
    const [ imagesCount, setImagesCount ] = useState<number>(0);

  return (
    <div className={customComponentClassName}>
        <input type='hidden' name='imagesCount' value={imagesCount} />
      <input id="upload" type="file" accept="image/*" ref={imgFileRef}
        className='text-sm text-stone-500
                  file:mr-5 file:py-1 file:px-3 file:border-[1px] file:rounded-md
                  file:text-xs file:font-medium
                  file:bg-stone-50 file:text-stone-700
                  hover:file:cursor-pointer hover:file:bg-blue-50
                  hover:file:text-blue-700'
        required 
        onChange={async (e) => {
          // imgDivRef.current!.style.visibility = "hidden";

          const files = e.currentTarget.files //fileInput.files;

          if(!files || files.length === 0) return;

          // displaying the uploaded image
          // const imageToResize = document.querySelector("#imgToResize");
          imgToResizeRef.current!.src = await fileToDataUri(files![0]) as string;

        }}
      />

        {/* <input type='hidden' name='uploadedFiles' value={resizeImageFilesStringify} /> */}
        <div id="images" ref={imgDivRef} >
            <img id="imgToResize" ref={imgToResizeRef} hidden={true}
            onLoad={(e) => {
                const { naturalWidth } = e.currentTarget;
                const thumnailWidth = 200;
                const newResizeFactor = thumnailWidth / naturalWidth;
                let fileName = '';
                let fileType = '';

                if(imgFileRef.current) {
                  if(imgFileRef.current.files) {
                    fileName = imgFileRef.current.files[0].name;
                    fileType = imgFileRef.current.files[0].type;
                  }
                }

                // resizing the image and displaying it
                // const resizedImage = document.querySelector("#resizedImage");
                resizedImgRef.current!.src = resizeImage(imgToResizeRef.current!, newResizeFactor);
                const resizedImages = [...resizedImageFile];
                
                const resizedFile: IFilesUploadType = {
                  srcOriginal: imgToResizeRef.current ? imgToResizeRef.current.src : '',
                  srcThumbnail: resizedImgRef.current ? resizedImgRef.current.src : '',
                  fileName: fileName,
                  fileType: fileType
                }
                resizedImages.push(resizedFile);
                setResizedImageFile(resizedImages);
                setImagesCount(imagesCount + 1);

                // making the div containing the image visible
                imgDivRef.current!.style.visibility = "visible";

            }}/>
            <img id="resizedImage" ref={resizedImgRef} hidden={true}/>
        
            <div className={gridClassName}>
            {
                resizedImageFile.map((rif, i) => {
                return (
                    <div key={rif.fileName} className='relative w-[200px]'>
                        <input type='hidden' name={'image'+(i+1).toString().trim()} value={JSON.stringify(resizedImageFile[i])} />
                        <img id="resizedImage" 
                            src={rif.srcThumbnail}
                            key={rif.fileName} />
                        
                        <div className='z-100 absolute top-2 right-2 text-red-600 p-1 border border-black rounded-md bg-white cursor-pointer'
                            onClick={() => {
                            const riFiles = resizedImageFile.filter((f) => {
                                return f.fileName != rif.fileName;
                            })

                            setResizedImageFile(riFiles);
                            }}>
                            <Trash2 className='text-xs' />
                        </div>
                    </div>
                )
                })
            }
            </div>
        </div>
    </div>
  )
}

export default ThumnailsComponent