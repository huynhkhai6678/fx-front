export interface Restaurant {
    restaurant_id : number,
    restaurant_name: string,
    cr_today_business_status : boolean,
    cr_today_business_time :string,
    food_items? : any,
    photos: string,
    restaurant_gallery_url: string
}