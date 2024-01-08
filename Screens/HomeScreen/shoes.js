const items = [
    {
        name: "Air Force 1 Kids Trainer",
        price: 49.99,
        description: "Nike Air Force 1 Kids Low Trainer in black and gold metallic. Named after the iconic AF1, the president's personal jet.",
        category: 'Kids',
        image_url: 'https://www.footasylum.com/images/products/medium/4059013.jpg',
        color1:'White',
        color2:'Black',
        sale:'no',
        id:1
    },
    {
        name: "Air Force 1 '07 Trainer",
        price: 119.99,
        description: "Nike Air Force 1 '07 Trainers in white, midnight navy and bright crimson. 40+ years of iconic style and charisma.",
        category: 'Mens',
        image_url: 'https://www.footasylum.com/images/products/medium/4098839.jpg',
        color1:'White',
        color2:'Red',
        sale:'no',
        id:2
    },
    {
        name: "Air Force 1 Trainer",
        price: 109.99,
        description: "Nike Women's Air Force 1 Trainers in white. Lovingly envelop your feet in the airness of the Air Force 1.",
        category: 'Womens',
        image_url: 'https://www.footasylum.com/images/products/medium/4052035.jpg',
        color1:'White',
        color2:'',
        sale:'no',
        id:3
    },
    {
        name: "Jordan 1 Mid Trainer",
        price: 114.99,
        description: "Air Jordan 1 Mid Trainers in lucky green and white. The AJ1 is a statement silhouette, perfect for your spring Summer.",
        category: 'Mens',
        image_url: 'https://www.footasylum.com/images/products/medium/4088587.jpg',
        color1:'Green',
        color2:'White',
        sale:'no',
        id:4
    },
    {
        name: "Air Max 90 Trainer",
        price: 119.99,
        description: "Nike Air Max 90 Trainers in black. Technical balance slotting seamlessly into your everyday casual wear.",
        category: 'Mens',
        image_url: 'https://www.footasylum.com/images/products/medium/4033316.jpg',
        color1:'Black',
        color2:'',
        sale:'no',
        id:5
    },
    {
        name: 'Jordan 1 Mid Trainer',
        price: 114.99,
        description: 'Air Jordan 1 Mid Trainers in obsidian and white. Taking inspiration from the original ground-breaking Jordan 1s from 1985.',
        category: 'Mens',
        image_url: 'https://www.footasylum.com/images/products/medium/4025980.jpg',
        color1:'Black',
        color2:'White',
        sale:'no',
        id:6
    },
    {
        name: "Air Max 90 Trainer",
        price: 144.99,
        description: "Nike Trainers in black, white and dark smoke grey. Designed for seamless performance running.",
        category: 'Mens',
        image_url: 'https://www.footasylum.com/images/products/medium/4033319.jpg',
        color1:'Black',
        color2:'White',
        sale:'no',
        id:7
    },

    {
        name: "Air More Uptempo Trainer",
        price: 69.99,
        description: "Nike Junior Air More Uptempo Trainers in black and anthracite. Fresh from its 25th anniversary, the iconic silhouette is back in 2024.",
        category: 'Kids',
        image_url: 'https://www.footasylum.com/images/products/medium/4094616.jpg',
        color1:'Black',
        color2:'',
        sale:'no',
        id:8
    },
    {
        name: "Air Max Pulse Trainer",
        price: 144.99,
        description: "Nike Women's Air Max Pulse Trainers in fierce pink, fireberry and active fuschia. With its finger firmly on the Pulse and drawing inspiration from the London music scene.",
        category: 'Womens',
        image_url: 'https://www.footasylum.com/images/products/medium/4094904.jpg',
        color1:'Pink',
        color2:'',
        sale:'no',
        id:9
    },
    {
        name: "Nike Dunk Trainer",
        price: 99.99,
        description: "Nike Women's Dunk Trainers in summit white, rosewood and grey. Originally created for the basketball court, but didn't take long to leak out onto the streets.",
        category: 'Womens',
        image_url: 'https://www.footasylum.com/images/products/medium/4101957.jpg',
        color1:'White',
        color2:'Grey',
        sale:'no',
        id:10
    },
    {
        name: "Gamma Force Trainer",
        price: 89.99,
        description: "Nike Women's Gamma Force Trainers in white, malachite and light smoke grey. Feel the full force of this new take on the legendary Air Force 1 model.",
        category: 'Womens',
        image_url: 'https://www.footasylum.com/images/products/medium/4094894.jpg',
        color1:'White',
        color2:'Green',
        sale:'no',
        id:11
    },
    {
        name: "Air Max 90 Futura Trainer",
        price: 89.99,
        description: "Nike Women's Air Max 90 Futura Trainers in medium olive, midnight navy and burgundy crush. Built from a mix of smooth leathers and breathable mesh providing a unique layered look.",
        category: 'Womens',
        image_url: 'https://www.footasylum.com/images/products/medium/4081242.jpg',
        color1:'Blue',
        color2:'Green',
        sale:'no',
        id:12
    },
    {
        name: 'Flight 89 Trainer',
        price: 119.99,
        description: "Nike Flight '89 Trainers in white, cherrywood and grey. The original basketball performance shoe of 1989.",
        category: 'Mens',
        image_url: 'https://www.footasylum.com/images/products/medium/4091564.jpg',
        color1:'White',
        color2:'Red',
        sale:'no',
        id:13
    },
    {
        name: 'Junior Dunk Low Trainer',
        price: 69.99,
        description: "Junior Dunk Low Trainers in summit white, industrial blue and black. Magnificently vintage, but still ultra fresh.",
        category: 'Kids',
        image_url: 'https://www.footasylum.com/images/products/medium/4099244.jpg',
        color1:'White',
        color2:'Blue / Black',
        sale:'no',
        id:14
    },
    {
        name: 'Junior Air Max 90 Leather',
        price: 99.99,
        description: "Nike Junior Air Max 90 Leather Trainers in white, action grape and phantom. With famous cushioning softer than any previous version.",
        category: 'Kids',
        image_url: 'https://www.footasylum.com/images/products/medium/4088641.jpg',
        color1:'White',
        color2:'Purple',
        sale:'no',
        id:15
    },
    {
        name: 'Air Max 270 Trainer',
        price: 74.99,
        description: "Air Max 270 Trainers in summit white, emerald rise and jade ice. With transparent 270 degrees of soft and lightweight cushioning.",
        category: 'Kids',
        image_url: 'https://www.footasylum.com/images/products/medium/4091156.jpg',
        color1:'White',
        color2:'Blue',
        sale:'no',
        id:16
    },
    {
        name: "Junior Blazer Mid '77",
        price: 67.99,
        description: "Nike Junior Blazer Mid '77 in white and pink foam. Channelling the old-school vibes of Nike basketball.",
        category: 'Kids',
        image_url: 'https://www.footasylum.com/images/products/medium/4094609.jpg',
        color1:'White',
        color2:'Pink',
        sale:'no',
        id:17
    },
    {
        name: "Air Max Furyosa Trainer",
        price: 144.99,
        description: "Nike Women's Air Max Furyosa Trainers in ashen sate, white, venice and purple. Inspired by heritage Nike running shoes from the 90s.",
        category: 'Womens',
        image_url: 'https://www.footasylum.com/images/products/medium/4088731.jpg',
        color1:'Purple',
        color2:'Blue',
        sale:'no',
        id:18
    },
];

const getShoeData = () => {
    return items;
}

export default getShoeData;