export const CONTENT_PART_1 = require("../API/CONTENTLISTINGPAGE-PAGE1.json")
export const CONTENT_PART_2 = require("../API/CONTENTLISTINGPAGE-PAGE2.json")
export const CONTENT_PART_3 = require("../API/CONTENTLISTINGPAGE-PAGE3.json")


export function getContentImage(id:string){
    if (id && !id.includes("missing")) {

     return image_assets[id.toString()]
    }else{
        return  image_assets.default
    }
    
}

//var pageNo = 1;

export function getDataFromPage(pageNo:number){
    switch (pageNo) {
        case 1:
            return CONTENT_PART_1.page['content-items']['content'] 
            
        case 2:
            return CONTENT_PART_2.page['content-items']['content'] 
        
        case 3:
            return CONTENT_PART_3.page['content-items']['content'] 
    
        default:
            return []
    }
}

export const image_assets = {
    'poster1.jpg':require('../assests/poster1.jpg'),
    'poster2.jpg':require('../assests/poster2.jpg'),
    'poster3.jpg':require('../assests/poster3.jpg'),
    'poster4.jpg':require('../assests/poster4.jpg'),
    'poster5.jpg':require('../assests/poster5.jpg'),
    'poster6.jpg':require('../assests/poster6.jpg'),
    'poster7.jpg':require('../assests/poster7.jpg'),
    'poster8.jpg':require('../assests/poster8.jpg'),
    'poster9.jpg':require('../assests/poster9.jpg'),
    'default':require('../assests/placeholder_for_missing_posters.png'),
    'search':require('../assests/search.png')
}