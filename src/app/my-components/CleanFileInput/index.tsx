'use client'

import { ECensorLevels, getObjectURLFromFile, ImageStyles } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react'
import Image from "next/image";
import Photo from '@/../public/Logo3.png';
import * as nsfwjs from "nsfwjs";
import { fileToDataUri } from '@/lib/thumbnailsComponent';

const nsfwjsModel = process.env.NSFW_JS_MODEL ?? 'MobileNetV2';

function CleanFileInput({ imageUrl, setCleanFlag, setFileUrl, id, clasnName }: {
    imageUrl?: string,
    setImageUrl?: (url: string) => void,
    setCleanFlag: (flag: boolean | null) => void,
    setFileUrl?: (fileUrl: string | null) => void,
    id: string,
    clasnName?: string
}) {
    const [ censor, setCensor ] = useState<string>('normal');
    const refHiddenImage = useRef<HTMLImageElement>(null);
    const [ innerImageUrl, setInnerImageUrl ] = useState<string>(Photo.src);
    const [ innerFileUrl, setInnerFileUrl ] = useState<string | null>(null);

    useEffect(() => {
        if(imageUrl) {
            setInnerImageUrl(imageUrl);
        } else {
            setInnerImageUrl(Photo.src);
        }

        if(setFileUrl) { setFileUrl(null); }
    }, [])
    
    useEffect(() => {

    }, [ censor ]);

    useEffect(() => {

        if((imageUrl && imageUrl !== Photo.src) || (innerImageUrl && innerImageUrl != Photo.src)) {
            nsfwjs
                .load(nsfwjsModel)
                .then(function (model) {
                    // Classify the image
                    return model.classify(refHiddenImage.current!);
                })
                .then(function (predictions) {

                    if(predictions[0].className === 'Porn') {
                        setCensor(ECensorLevels.Hidden);
                        setCleanFlag(false);
                        if (setFileUrl) setFileUrl(null);
                        setInnerFileUrl(null);
                        setInnerImageUrl('');
    
                    } else if(predictions[0].className === 'Sexy' || predictions[0].className === 'Hentai') {
                        setCensor(ECensorLevels.Hidden);
                        setCleanFlag(false);
                        if (setFileUrl) setFileUrl(null);
                        setInnerFileUrl(null);
                        setInnerImageUrl('');
    
                    } else {
                        setCensor(ECensorLevels.Hidden);
                        setCleanFlag(true);
                        if (setFileUrl) { 
                            setFileUrl(innerFileUrl);
                        }
                    }
    
            });
        } else {
            setCensor(ECensorLevels.Normal);
            setCleanFlag(null);
            if (setFileUrl) setFileUrl(null);
        }

    }, [ imageUrl, innerImageUrl ]);

useEffect(() => {

    if (setFileUrl) {
        setFileUrl(innerFileUrl);
    }
}, [ innerFileUrl ]);

  return (
    <div className="m-1">
        <input id={id} type="file" accept="image/*" className={clasnName ? clasnName : ''} required
            onChange={async (e) => {
                if(e.currentTarget.files?.length == 0) return;

                const file = e.currentTarget.files![0];
                setCleanFlag(null);
                setInnerFileUrl(null);
                if(setFileUrl) setFileUrl(null);

                const res = await fileToDataUri(e.currentTarget.files![0]);
                    
                setInnerFileUrl(res as string);
                if(setFileUrl) { setFileUrl(res as string); }

                getObjectURLFromFile(file,  setInnerImageUrl, () => {
                    if(setCensor) setCensor(ECensorLevels.Normal);
                    else setCleanFlag(null);
                })
            
        }} />

        <div className={ censor === ECensorLevels.Normal || censor === ECensorLevels.Hidden ? 'hidden' : 'top-0 mt-5 border-4 border-red-500 overflow-hidden'}> 
            <div className={`${ImageStyles[censor as keyof typeof ImageStyles]}`}>
            <Image src={innerImageUrl} alt="image" 
                width={300} height={300} ref={refHiddenImage}/>

            </div>
        </div>

    </div>
  )
}

export default CleanFileInput
