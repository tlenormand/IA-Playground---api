/* global requestWrapper */

import { Router } from 'express';


const router = new Router();

router.get('/get_alive', requestWrapper(() => {
    const funFacts = [
        'Honey never spoils. It has even been found in the tombs of ancient Egyptians that was still edible!',
        'Octopuses have three hearts and blue blood.',
        'Giraffes have the same number of neck vertebrae as humans (seven), but they are much larger!',
        'Hippos can run faster than humans over short distances.',
        'Elephants are the only animals that cannot jump.',
        'Sloths can move faster in water than on land.',
        'Penguins can be gay: they form same-sex couples and sometimes adopt abandoned babies.',
        'Cats have more muscles in their ears than any other animal.',
        'Sheep have excellent memories. They can recognize up to 50 other sheep and remember faces for several years.',
        'Rats laugh when they are tickled.'
    ];
    const jokes = [
        'Why do fish hate computers? Because they\'re afraid of the net!',
        'What\'s the electrician\'s worst job? Getting shocked!',
        'Why do divers always dive backwards and never forwards? Because otherwise they\'d fall into the boat!',
        'What did one ocean say to the other ocean? Nothing, they just waved!',
        'What did the dog say to the tree? "Bark up the wrong tree, I don\'t have any hands!"',
        'Why do birds fly south in the winter? Because it\'s too far to walk!',
        'Why do cows wear bells? Because their horns don\'t work!',
        'What\'s always at the end of a road? The letter "W"!',
        'What do you call a bee that comes back? A "bae"!',
        'What\'s the quietest sport? Golf: even the spectators whisper!'
    ];

    return {
        code: 200_000,
        data: {
            funFact: funFacts[Math.floor(Math.random() * funFacts.length)],
            joke: jokes[Math.floor(Math.random() * jokes.length)]
        }
    };
}));


export default router;
