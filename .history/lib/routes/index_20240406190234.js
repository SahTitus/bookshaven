export const navRoutes = [
    {
        name: 'Home',
        path: '/',
    },
    {
        name: 'Blog',
        path: '/blog',
    },
    {
        name: 'Contact',
        path: '/contact',
    },
    {
        name: 'About me',
        path: '/about-me',
    },
    // {
    //     name: 'Bookmarks',
    //     path: '/bookmarks',
    // },
    // {
    //     name: 'Algogenz AI',
    //     path: '#',
    // },
    // {
    //     name: 'Subscribe',
    //     path: '#',
    // },
    // {
    //     name: 'Help',
    //     path: '/#',
    // },
    // {
    //     name: 'Feedback',
    //     path: '#',
    // },
]
export const clientRoutes = {
    home: '/',
    blog: '/blog',
    tag: '/blog/tag',
    categories: '/blog/categories',
    article: '/article',
    search: '/search',
    logo: 'favicon.ico',
    algogenzIcon: '/algo.png',
    manifest: "/manifest.json",
}

export const staticRoutes = [
    '',
    // '/algogenz-ai',
    '/about-me',
    '/contact',
];

export const footerLinks = {
    privacyPolicy: '/privacy-policy',
    terms_conditions: '/terms-and-conditions',
    whatsapp: 'https://chat.whatsapp.com/E57qMkbVHbW6Uj0XNQwz2r',
    facebook: '#',
    linkedin: '#',
    twitter: '#',
}

export const cloudEndpoint = 'https://api.cloudinary.com/v1_1/algogenz/image/upload'
export const clientBaseURL = process.env.NODE_ENV === 'production' ? 'https://algogenz.com' : 'https://algogenz.com';
export const sitemapURL = `${clientBaseURL}/sitemap.xml`;
export const githubURL = 'https://github.com/sahtitus';
export const twitterURL = 'https://twitter.com/TitusSah';
export const facebookURL = 'https://facebook.com/titus.samuel.779';
export const linkedInURL = 'https://www.linkedin.com/in/sah-titus-62148a21a';
export const buyMeCoffeenURL = 'https://www.buymeacoffee.com/sahtitus';