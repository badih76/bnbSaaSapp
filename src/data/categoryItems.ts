export interface iAppProps {
    name: string,
    title: string,
    imageUrl: string,
    description: string,
    id: number,
    imgStyle?: object,
  }

  import Beach from "@/../public/icons/beachChair.png";
  import Trending from "@/../public/icons/popularity.png";
  import BeachFront from "@/../public/icons/beachfront.png";
  import EarthHome from "@/../public/icons/GreenHouse2.png";
  import Luxe from "@/../public/icons/restaurants.png";
  import AmazingView from "@/../public/icons/view.png";
  import Design from "@/../public/icons/staircase.png";
  import Pool from "@/../public/icons/swimmingPool.png";
  import TinyHome from "@/../public/icons/house.png";
  import HistoricHome from "@/../public/icons/historicHouse.png";
  import CountrySide from "@/../public/icons/farm.png";
  import OMG from "@/../public/icons/omg.png";
  import Surf from "@/../public/icons/surfboard.png";

  // const iconBackGroundColor = "rgb(201, 159, 0, 1)"
  
  export const categoryItems: iAppProps[] = [
    {
      id: 0,
      name: "beach",
      description: "This Property is close to the Beach.",
      title: "Beach",
      imageUrl: Beach.src,
        // "https://a0.muscache.com/pictures/10ce1091-c854-40f3-a2fb-defc2995bcaf.jpg",
      imgStyle: {
        width: "50px",
        aspectRatio: "1",
        display: "inline-block",
        // // background: iconBackGroundColor,
        mask: `url("${Beach.src}") center/contain`,
        maskRepeat: 'space'
      }
    },
    {
      id: 1,
      name: "trending",
      description: "This is a Property which is trending.",
      title: "Trending",
      imageUrl: Trending.src,
        // "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
      imgStyle: {
        width: "50px",
        aspectRatio: "1",
        display: "inline-block",
        // background: iconBackGroundColor,
        mask: `url("${Trending.src}") center/contain`,
        maskRepeat: 'space'
      }
    },
    {
      id: 2,
      name: "beachfront",
      description: "This is a Property is close to the beachfront",
      title: "Beachfront",
      imageUrl: BeachFront.src,
        // "https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg",
      imgStyle: {
        width: "50px",
        aspectRatio: "1",
        display: "inline-block",
        // background: iconBackGroundColor,
        mask: `url("${BeachFront.src}") center/contain`,
        maskRepeat: 'space'
      }
    },
    {
      id: 3,
      name: "earthhome",
      description: "This Property is considerd a Earth Home",
      title: "Earth Home",
      imageUrl: EarthHome.src,
        // "https://a0.muscache.com/pictures/d7445031-62c4-46d0-91c3-4f29f9790f7a.jpg",
      imgStyle: {
        width: "50px",
        aspectRatio: "1",
        display: "inline-block",
        // background: iconBackGroundColor,
        mask: `url("${EarthHome.src}") center/contain`,
        maskRepeat: 'space'
      }
    },
    {
      id: 4,
      name: "luxe",
      description: "This Property is considerd Luxorious",
      title: "Luxe",
      imageUrl: Luxe.src,
        // "https://a0.muscache.com/pictures/c8e2ed05-c666-47b6-99fc-4cb6edcde6b4.jpg",
      imgStyle: {
        width: "50px",
        aspectRatio: "1",
        display: "inline-block",
        // background: iconBackGroundColor,
        mask: `url("${Luxe.src}") center/contain`,
        maskRepeat: 'space'
      }
    },
    {
      id: 5,
      name: "amazingView",
      description: "This property has an amazing View",
      title: "Amazing View",
      imageUrl: AmazingView.src,
        // "https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg",
      imgStyle: {
        width: "50px",
        aspectRatio: "1",
        display: "inline-block",
        // background: iconBackGroundColor,
        mask: `url("${AmazingView.src}") center/contain`,
        maskRepeat: 'space'
      }
    },
    {
      id: 6,
      name: "design",
      description: "This property puts a big focus on design ",
      title: "Design",
      imageUrl: Design.src,
        // "https://a0.muscache.com/pictures/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg",
      imgStyle: {
        width: "50px",
        aspectRatio: "1",
        display: "inline-block",
        // background: iconBackGroundColor,
        mask: `url("${Design.src}") center/contain`,
        maskRepeat: 'space'
      }
    },
    {
      id: 7,
      name: "pool",
      description: "This property has an amazing Pool",
      title: "Pool",
      imageUrl: Pool.src,
        // "https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg",
      imgStyle: {
        width: "50px",
        aspectRatio: "1",
        display: "inline-block",
        // background: iconBackGroundColor,
        mask: `url("${Pool.src}") center/contain`,
        maskRepeat: 'space'
      }
    },
    {
      id: 8,
      name: "tiny",
      description: "This property is considered a tiny home",
      title: "Tiny Home",
      imageUrl: TinyHome.src,
        // "https://a0.muscache.com/pictures/3271df99-f071-4ecf-9128-eb2d2b1f50f0.jpg",
      imgStyle: {
        width: "50px",
        aspectRatio: "1",
        display: "inline-block",
        // background: iconBackGroundColor,
        mask: `url("${TinyHome.src}") center/contain`,
        maskRepeat: 'space'
      }
    },
    {
      id: 9,
      name: "historic",
      description: "This Property is considered historic",
      title: "Historic Home",
      imageUrl: HistoricHome.src,
        // "https://a0.muscache.com/pictures/33dd714a-7b4a-4654-aaf0-f58ea887a688.jpg",
      imgStyle: {
        width: "50px",
        aspectRatio: "1",
        display: "inline-block",
        // background: iconBackGroundColor,
        mask: `url("${HistoricHome.src}") center/contain`,
        maskRepeat: 'space'
      }
    },
    {
      id: 10,
      name: "countryside",
      description: "This Property is located on the countryside",
      title: "Countryside",
      imageUrl: CountrySide.src,
        // "https://a0.muscache.com/pictures/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg",
      imgStyle: {
        width: "50px",
        aspectRatio: "1",
        display: "inline-block",
        // background: iconBackGroundColor,
        mask: `url("${CountrySide.src}") center/contain`,
        maskRepeat: 'space'
      }
    },
    {
      id: 11,
      name: "omg",
      description: "This Property has a wow factor",
      title: "WOW!",
      imageUrl: OMG.src,
        // "https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg",
      imgStyle: {
        width: "50px",
        aspectRatio: "1",
        display: "inline-block",
        // background: iconBackGroundColor,
        mask: `url("${OMG.src}") center/contain`,
        maskRepeat: 'space'
      }
    },
    {
      id: 12,
      name: "surfing",
      description: "This Property is located near to a surfing spot",
      title: "Surfing",
      imageUrl: Surf.src,
        // "https://a0.muscache.com/pictures/957f8022-dfd7-426c-99fd-77ed792f6d7a.jpg",
      imgStyle: {
        width: "50px",
        aspectRatio: "1",
        display: "inline-block",
        // background: iconBackGroundColor,
        mask: `url("${Surf.src}") center/contain`,
        maskRepeat: 'space'
      }
    },
  ];
  