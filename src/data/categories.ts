export const categories = [
    {
        id: 1,
        title: 'Story Writing',
        icon: '📝',
        desc: 'Creative writing prompts for stories',
        image: '/images/story.jpg',
        prompts: [
            { id: 1, title: 'Fantasy Adventure', text: 'Write a story about a magical journey...' },
            { id: 2, title: 'Mystery Plot', text: 'Create a detective story where...' },
            // Add more prompts
        ]
    },
    {
        id: 2,
        title: 'Code Generation',
        icon: '💻',
        desc: 'Programming and development prompts',
        image: '/images/code.jpg',
        prompts: [
            { id: 1, title: 'React Component', text: 'Create a reusable React component for...' },
            { id: 2, title: 'API Design', text: 'Design a RESTful API for...' },
            // Add more prompts
        ]
    },
    {
        id: 3,
        title: 'Business',
        icon: '💼',
        desc: 'Professional and business writing',
        image: '/images/business.jpg',
        prompts: [
            { id: 1, title: 'Email Template', text: 'Write a professional email for...' },
            { id: 2, title: 'Marketing Copy', text: 'Create compelling marketing copy for...' },
            // Add more prompts
        ]
    },
    // Add more categories
];

export const trendingPrompts = [
    {
        id: 1,
        title: 'AI Story Generator',
        prompt: 'Create an engaging story with complex characters and plot twists...',
        category: 'Story Writing',
        uses: 2345,
        tags: ['Creative', 'Story'],
        rating: 4.8
    },
    {
        id: 2,
        title: 'React Component Builder',
        prompt: 'Generate a reusable React component with TypeScript and Tailwind...',
        category: 'Code Generation',
        uses: 1892,
        tags: ['Code', 'React'],
        rating: 4.9
    },
    // Add more trending prompts
];

export const featuredCollections = [
    {
        id: 1,
        title: 'Business Essentials',
        description: 'Professional writing prompts for business communication',
        prompts: [/* Add prompts */],
        image: '/images/business-collection.jpg'
    },
    // Add more collections
]; 