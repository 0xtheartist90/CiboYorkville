'use client';

import { useRef, useState } from 'react';

type MenuItem = { name: string; price: string; desc?: string; gf?: boolean };
type Group = { title?: string; items: MenuItem[] };
type Section = { label: string; note?: string; groups: Group[]; footer?: string };

// From the Yorkville food, bar, dessert and wine lists on cibo.menu.
const SECTIONS: Section[] = [
    {
        label: 'Antipasto',
        groups: [
            {
                items: [
                    { name: 'House Made Focaccia', price: '6', desc: 'Spiced olives and peperoncino' },
                    {
                        name: 'Bruschetta',
                        price: '12',
                        desc: 'Tomatoes, garlic, oregano, shavings of parmigiano reggiano, balsamic glaze'
                    },
                    { name: 'Polenta Fries', price: '14', desc: 'Gorgonzola dip + spicy marinara' },
                    { name: 'Polpettine', price: '16', desc: 'In tomato sauce' },
                    { name: 'Arancini', price: '16', desc: 'Rice balls stuffed with meat ragu, melted mozzarella' },
                    {
                        name: 'Caprese',
                        price: '22',
                        gf: true,
                        desc: 'Mozzarella di bufala, vine ripened tomatoes, basil, extra-virgin olive oil, balsamic vinegar'
                    },
                    {
                        name: 'Funghi',
                        price: '20',
                        gf: true,
                        desc: 'Grilled portobello, oyster + cremini mushrooms, truffled balsamic vinegar'
                    },
                    {
                        name: 'Carpaccio',
                        price: '24',
                        gf: true,
                        desc: 'Thinly sliced raw beef, arugula, shavings of parmigiano reggiano, lemon juice'
                    },
                    { name: 'Fried Zucchini + Artichokes', price: '22', desc: 'Roasted red pepper aioli' },
                    { name: 'Baked Eggplant', price: '20', desc: 'Melted bocconcini, parmigiano, light tomato' },
                    {
                        name: 'Minestrone',
                        price: '18',
                        gf: true,
                        desc: 'Zucchini, potatoes, beans, celery, carrots, tomato broth'
                    },
                    {
                        name: 'Grilled Whole Calamari',
                        price: '24',
                        gf: true,
                        desc: 'Mixed greens, diced tomatoes, extra-virgin olive oil, lemon juice'
                    },
                    {
                        name: 'Grilled Octopus',
                        price: '24',
                        gf: true,
                        desc: 'Mixed greens, radicchio, purple potato, green beans, fried capers, lemon juice'
                    },
                    { name: 'Black Tiger Shrimp', price: '22', desc: 'Spicy wine garlic tomato sauce' },
                    { name: 'Fried Calamari', price: '22', desc: 'Garlic mayo + spicy marinara' },
                    {
                        name: 'Mediterranean Clams + Mussels',
                        price: '24',
                        gf: true,
                        desc: 'Parma broth, crispy shallots, chives'
                    },
                    {
                        name: 'Chopped Raw Tuna',
                        price: '24',
                        desc: 'Lemon, avocado, Sicilian capers, extra-virgin olive oil, sea salt'
                    }
                ]
            }
        ]
    },
    {
        label: 'Salumi & Insalate',
        groups: [
            {
                title: 'Salumeri',
                items: [
                    {
                        name: 'Salumi',
                        price: '26',
                        desc: 'Prosciutto di Parma, capocollo, salsiccia Calabrese, homemade taralli, olives'
                    },
                    {
                        name: 'Prosciutto + Formaggio',
                        price: '26',
                        gf: true,
                        desc: 'Prosciutto di Parma, hot salami, Italian cheeses, olives'
                    },
                    {
                        name: 'Formaggi',
                        price: '25',
                        gf: true,
                        desc: 'Soft + hard Italian cheeses, walnuts, honey peppered pineapple'
                    },
                    {
                        name: 'Burrata',
                        price: '29',
                        gf: true,
                        desc: 'Traditional soft Italian cheese, Prosciutto di Parma, arugula, aged balsamic vinegar'
                    }
                ]
            },
            {
                title: 'Insalate',
                items: [
                    {
                        name: 'Organic Mixed Greens',
                        price: '16',
                        gf: true,
                        desc: 'Balsamic vinegar, extra-virgin olive oil'
                    },
                    {
                        name: 'Insalata Cesare',
                        price: '18',
                        desc: 'Croutons, bacon, parmigiano, lemon, extra-virgin olive oil'
                    },
                    {
                        name: 'Radicchio + Endive',
                        price: '18',
                        gf: true,
                        desc: 'Sweet gorgonzola, roasted red peppers, black olives, pine nuts, honey, balsamic'
                    },
                    {
                        name: 'Arugula Tuna',
                        price: '22',
                        gf: true,
                        desc: 'Seared tuna, potatoes, eggs, red onions, cherry tomatoes, olives, green beans, anchovies'
                    },
                    {
                        name: 'Arugula, Radicchio, Endive',
                        price: '20',
                        gf: true,
                        desc: 'Portobello mushrooms, shaved parmigiano reggiano, lemon, extra-virgin olive oil'
                    }
                ]
            }
        ]
    },
    {
        label: 'Pizza',
        note: 'Half price every Tuesday.',
        groups: [
            {
                title: 'Classiche',
                items: [
                    { name: 'Margherita', price: '19', desc: 'Fior di latte, San Marzano D.O.P. tomato, basil' },
                    {
                        name: 'Da Napoli',
                        price: '19',
                        desc: 'Tomato chunks, fresh mozzarella, grana padano, garlic, oregano'
                    },
                    {
                        name: 'Mozzarella di Bufala',
                        price: '22',
                        desc: 'Tomato, mozzarella di bufala, basil, extra-virgin olive oil'
                    },
                    {
                        name: 'San Giorgio',
                        price: '22',
                        desc: 'Tomato, fresh mozzarella, spicy soppressata, black olives'
                    },
                    {
                        name: 'Americana',
                        price: '22',
                        desc: 'Tomato, fresh mozzarella, pepperoni, mushroom, green peppers'
                    },
                    {
                        name: 'Diavola',
                        price: '24',
                        desc: 'Tomato, fresh mozzarella, spicy calabrese salami, roasted red peppers'
                    },
                    {
                        name: 'Capricciosa',
                        price: '24',
                        desc: 'Tomato, fresh mozzarella, Italian ham, mushrooms, artichokes, olives'
                    },
                    {
                        name: 'Quattro Stagioni',
                        price: '24',
                        desc: 'Tomato, fresh mozzarella, olives, red peppers, mushrooms, eggplant, zucchini'
                    }
                ]
            },
            {
                title: 'Gourmet',
                items: [
                    {
                        name: 'Di Nicolino',
                        price: '27',
                        desc: 'Tomato, fior di latte, arugula, prosciutto di Parma crudo'
                    },
                    { name: 'Funghi', price: '26', desc: 'Wild mushrooms, fontina cream, white truffle oil' },
                    {
                        name: 'Gorgonzola',
                        price: '24',
                        desc: 'Fresh mozzarella, gorgonzola, fresh pears, walnuts, honey'
                    },
                    {
                        name: 'Pollo Pesto',
                        price: '27',
                        desc: 'Pesto chicken, fior di latte, roasted peppers, goat cheese'
                    },
                    {
                        name: 'Mortadella',
                        price: '27',
                        desc: 'Smoked provolone, fresh mozzarella, pistachio, caramelized onion'
                    },
                    {
                        name: 'Fresh Italian Truffle',
                        price: '30',
                        desc: 'Summer truffle, truffle paste, mozzarella di bufala, Italian sausage, arugula'
                    }
                ]
            },
            {
                title: 'Calzone',
                items: [
                    { name: 'Roasted Veg', price: '24', desc: 'Tomato, bocconcini, rapini, roasted peppers' },
                    {
                        name: 'Italian Sausage',
                        price: '24',
                        desc: 'Tomato sauce, mozzarella, spicy Italian sausage, spicy soppressata'
                    }
                ]
            }
        ]
    },
    {
        label: 'Pasta',
        note: 'Gluten-free and whole wheat pasta available.',
        groups: [
            {
                title: 'Pasta Fresca · Made in House',
                items: [
                    { name: 'Lobster Ravioli', price: '32', desc: 'Lemon, béchamel, lobster cream sauce' },
                    {
                        name: 'Braised Short Rib Ravioli',
                        price: '32',
                        desc: 'Porcini cream sauce, parmigiano reggiano'
                    },
                    { name: 'Gnocchi', price: '28', desc: 'Tomato + ricotta, or gorgonzola, or rosé sauce' },
                    {
                        name: 'Lasagna',
                        price: '28',
                        desc: 'Mozzarella, salumi, traditional Bolognese sauce, parmigiano reggiano'
                    },
                    { name: 'Pappardelle', price: '32', desc: 'Slow cooked lamb ragu, pecorino shavings' },
                    {
                        name: 'Tagliatelle Bolognese',
                        price: '28',
                        desc: 'Traditional meat sauce, parmigiano reggiano'
                    },
                    { name: 'Tagliatelle', price: '28', desc: 'Wild mushroom, black truffle paste, white wine' },
                    { name: 'Spaghetti', price: '28', desc: 'Homemade meatballs, spicy tomato sauce' },
                    {
                        name: 'Orecchiette',
                        price: '29',
                        desc: 'Rapini, spicy Italian sausage, fontina, parmigiano reggiano, garlic'
                    }
                ]
            },
            {
                title: 'Lunga & Corta',
                items: [
                    { name: 'Spaghetti Pomodoro', price: '26', desc: 'Fresh tomato sauce, basil, garlic' },
                    {
                        name: 'Spaghetti Carbonara',
                        price: '27',
                        desc: 'Pancetta, egg yolk, parmigiano reggiano, cracked black pepper'
                    },
                    {
                        name: 'Linguine with Pesto',
                        price: '29',
                        desc: 'Grilled chicken, pesto, parmigiano reggiano, toasted pine nuts'
                    },
                    {
                        name: 'Seafood Linguine',
                        price: '30',
                        desc: 'Fresh clams, mussels, calamari, tiger shrimp, light tomato sauce'
                    },
                    {
                        name: 'Fettucine Alfredo',
                        price: '26',
                        desc: 'Light cream sauce, parmigiano reggiano, Italian parsley'
                    },
                    { name: 'Penne Arrabbiata', price: '26', desc: 'San Marzano tomato, hot chillies, garlic' },
                    { name: 'Penne alla Vodka', price: '27', desc: 'Rosé vodka cream sauce, pancetta' },
                    {
                        name: 'Fusilli',
                        price: '28',
                        desc: 'Chicken, porcini mushrooms, light cream sauce, truffle oil'
                    }
                ]
            },
            {
                title: 'Risotto',
                items: [
                    {
                        name: 'Sundried Tomato + Almond Pesto',
                        price: '24',
                        gf: true,
                        desc: 'Blistered tomato, parmigiano reggiano, spinach'
                    },
                    { name: 'Porcini', price: '29', gf: true, desc: 'Porcini mushrooms, truffle oil' },
                    {
                        name: 'Frutti di Mare',
                        price: '30',
                        gf: true,
                        desc: 'Fresh clams, mussels, calamari, tiger shrimp'
                    }
                ]
            }
        ]
    },
    {
        label: 'Secondi',
        groups: [
            {
                items: [
                    {
                        name: 'Bistecca',
                        price: '48',
                        desc: 'Grilled striploin steak, lobster compound butter, veal jus, french fries'
                    },
                    {
                        name: 'Pollo Parmigiana',
                        price: '36',
                        desc: 'Breaded organic chicken breast, mozzarella, parmigiano, tomato sauce, rapini, fingerling potatoes'
                    },
                    {
                        name: 'Veal Milanese',
                        price: '42',
                        desc: 'Butterflied breaded veal chop, rapini, roasted fingerling potatoes'
                    },
                    {
                        name: 'Chianti Braised Short Ribs',
                        price: '44',
                        desc: '10oz porcini crusted beef short ribs, gorgonzola polenta, crispy onions'
                    },
                    {
                        name: 'Branzino',
                        price: '42',
                        gf: true,
                        desc: 'Crispy whole fish, red pepper aioli, grilled rapini, cherry tomato salsa'
                    },
                    {
                        name: 'Salmone Fresco Atlantico',
                        price: '36',
                        gf: true,
                        desc: 'Fresh Atlantic salmon, grilled asparagus, fennel, orange salad'
                    }
                ]
            }
        ]
    },
    {
        label: 'Dolci',
        groups: [
            {
                items: [
                    {
                        name: 'Lemon Ricotta Cheesecake',
                        price: '12',
                        desc: 'Black cherries, white chocolate shavings'
                    },
                    { name: 'Tiramisù', price: '12', desc: 'A Venetian classic' },
                    { name: 'Gelato', price: '12', desc: 'Made in house' },
                    { name: 'Chocolate Baci Bombe', price: '12', desc: 'Hazelnut praline' },
                    { name: 'Vanilla Bean Panna Cotta', price: '12', desc: 'Strawberry, prosecco fizz' },
                    { name: 'Affogato', price: '12', desc: 'Vanilla gelato, espresso shot' },
                    { name: 'Nutella Pizza', price: '16', desc: 'Banana, crushed hazelnuts' }
                ]
            }
        ]
    },
    {
        label: 'Cocktails',
        note: 'Every drink half price at Cibo Sociale, Thursday and Friday from 2 to 6:30pm.',
        groups: [
            {
                items: [
                    {
                        name: 'Strawberry Coconut Spritz',
                        price: '18',
                        desc: 'Clarified strawberry, Cîroc Coconut vodka, rhubarb, prosecco'
                    },
                    { name: 'Passion Fruit Garibaldi', price: '17', desc: 'Fluffy orange juice, passion fruit, Campari' },
                    {
                        name: 'Watermelon Martini',
                        price: '17',
                        desc: 'Summer watermelon, lime, Ketel One vodka, bianco vermouth'
                    },
                    {
                        name: 'Blueberry Basil Margarita',
                        price: '18',
                        desc: 'Wild blueberry, fresh basil, lime, Tromba Blanco tequila'
                    },
                    {
                        name: 'Italian Rosé Lemonade',
                        price: '17',
                        desc: 'Amalfi limoncello, rosé vermouth, sparkling limonata'
                    },
                    { name: 'Cibo Espresso Martini', price: '18', desc: 'Chestnut liqueur, espresso, turbinado' },
                    {
                        name: 'Midnight Boulevardier',
                        price: '19',
                        desc: 'Amaro Alpino, Carpano Classico, Bearface whisky, dark chocolate'
                    },
                    {
                        name: 'Barrel-Aged Negroni',
                        price: '18',
                        desc: 'Tanqueray gin, Campari, Cinzano Rosso, on the rocks with orange zest'
                    },
                    {
                        name: 'Elderflower White Negroni',
                        price: '18',
                        desc: 'Tanqueray gin, St. Germain, white bitter, grapefruit'
                    },
                    {
                        name: 'Cibo Peach Sangria',
                        price: '16',
                        desc: 'Peach nectar, lemon, berries, Cîroc Peach, with white, sparkling or red wine'
                    }
                ]
            },
            {
                title: 'Senza Alcol',
                items: [
                    { name: 'Goldini Spritz', price: '13', desc: 'Novara non-alcoholic bitter aperitivo, orange, soda' },
                    { name: 'Sweet Tart', price: '13', desc: 'Roots Divino Rosso, pineapple, lemon, ginger, soda' },
                    { name: 'A Melona', price: '12', desc: 'Cedar’s non-alcoholic gin, melon, lemon, soda' },
                    { name: 'No-Groni', price: '15', desc: 'Cedar’s gin, Novara bitter, Roots Divino Rosso' }
                ]
            }
        ]
    },
    {
        label: 'Vino al Bicchiere',
        note: 'Prices for 5oz · 8oz · bottle. Over 2,500 bottles on the full list.',
        groups: [
            {
                title: 'Spumante & Rosato',
                items: [
                    { name: 'Prosecco, Villa Sandi', price: '12 · 60', desc: 'Il Fresco, Treviso DOC, Veneto' },
                    {
                        name: 'Lambrusco, Medici Ermete',
                        price: '14 · 70',
                        desc: 'Concerto, Reggiano DOC, Emilia-Romagna'
                    },
                    { name: 'Merlot Rosato, Fantini', price: '15 · 24 · 75', desc: 'Calalenta, Terre Siciliane IGT' }
                ]
            },
            {
                title: 'Bianco',
                items: [
                    { name: 'Grillo, Campagnola', price: '13 · 19 · 65', desc: 'Cataldo, Sicilia IGT' },
                    { name: 'Gavi, Bersano', price: '14 · 22 · 70', desc: 'Mirage, Gavi DOCG, Piemonte' },
                    {
                        name: 'Pinot Grigio, Giulio Straccali',
                        price: '14 · 22 · 70',
                        desc: 'Pavia IGT, Lombardia'
                    },
                    {
                        name: 'Verdicchio, Velenosi',
                        price: '14 · 22 · 70',
                        desc: 'Villa Angela, Castelli di Jesi Classico DOC'
                    }
                ]
            },
            {
                title: 'Rosso',
                items: [
                    {
                        name: 'Barbera, Bersano',
                        price: '13 · 19 · 65',
                        desc: 'Castalunga, Barbera d’Asti DOCG, Piemonte'
                    },
                    {
                        name: 'Super Tuscan, Villa Pillo',
                        price: '14 · 22 · 70',
                        desc: 'Borgoforte, Toscana IGT'
                    },
                    {
                        name: 'Chianti, Tenuta Sant’Alfonso',
                        price: '15 · 24 · 75',
                        desc: 'Chianti Classico DOCG, Toscana'
                    },
                    {
                        name: 'Primitivo, Vigneti del Salento',
                        price: '15 · 24 · 75',
                        desc: 'Zolla, Primitivo di Manduria DOC, Puglia'
                    },
                    {
                        name: 'Amarone, Cantine di Illasi',
                        price: '18 · 29 · 90',
                        desc: 'Amarone della Valpolicella DOCG, Veneto'
                    },
                    {
                        name: 'Barolo, Tenuta di Martucino',
                        price: '22 · 35 · 110',
                        desc: 'Barolo DOCG, Piemonte'
                    }
                ]
            }
        ]
    }
];

// Section names run across the top as a row of tabs (swipeable on phones). The dishes sit on a
// white card below, two columns wide on larger screens, with Cibo's stencil for the headings.
const MenuTabs = () => {
    const [active, setActive] = useState(0);
    const tabs = useRef<(HTMLButtonElement | null)[]>([]);
    const section = SECTIONS[active];

    const select = (i: number) => {
        setActive(i);
        tabs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    };

    return (
        <div>
            <div className='relative -mx-6 md:mx-0'>
                <div
                    role='tablist'
                    className='flex snap-x scroll-px-6 gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] md:flex-wrap md:px-0 [&::-webkit-scrollbar]:hidden'>
                    {SECTIONS.map((s, i) => (
                        <button
                            key={s.label}
                            role='tab'
                            aria-selected={i === active}
                            ref={(el) => {
                                tabs.current[i] = el;
                            }}
                            onClick={() => select(i)}
                            className={`font-display shrink-0 snap-start border px-4 py-2 text-lg whitespace-nowrap transition-colors md:px-5 md:text-xl ${
                                i === active
                                    ? 'border-[#17181a] bg-[#17181a] text-[#f7f5f1]'
                                    : 'border-[#17181a]/20 text-[#17181a]/70 hover:border-[#17181a] hover:text-[#17181a]'
                            }`}>
                            {s.label}
                        </button>
                    ))}
                </div>
                <div className='pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#efebe4] to-transparent md:hidden' />
            </div>

            <div
                role='tabpanel'
                className='mt-6 bg-[#f7f5f1] px-5 py-8 shadow-[0_1px_0_rgba(23,24,26,0.06),0_24px_60px_-30px_rgba(23,24,26,0.35)] md:px-12 md:py-12'>
                <div className='flex flex-col gap-2 border-b border-[#17181a]/15 pb-6 md:flex-row md:items-end md:justify-between'>
                    <h3 className='font-stencil text-4xl text-[#17181a] md:text-5xl'>{section.label}</h3>
                    {section.note && <p className='text-sm text-[#7a1f2b] md:text-right'>{section.note}</p>}
                </div>

                {section.groups.map((group) => (
                    <div key={group.title ?? section.label} className='mt-9 first:mt-8'>
                        {group.title && (
                            <h4 className='eyebrow mb-5 text-[#7a1f2b]'>{group.title}</h4>
                        )}
                        <div className='grid gap-x-14 gap-y-5 lg:grid-cols-2'>
                            {group.items.map((item) => (
                                <div key={item.name}>
                                    <div className='flex items-baseline gap-3'>
                                        <h5 className='text-[0.95rem] font-extrabold tracking-wide text-[#17181a] uppercase'>
                                            {item.name}
                                            {item.gf && (
                                                <span
                                                    className='ml-2 align-middle text-[0.65rem] font-bold tracking-[0.15em] text-[#17181a]/45'
                                                    title='Made with gluten-free ingredients'>
                                                    GF
                                                </span>
                                            )}
                                        </h5>
                                        <span className='mb-1 flex-1 border-b border-[#17181a]/15' />
                                        <span className='font-display shrink-0 text-lg text-[#17181a]'>{item.price}</span>
                                    </div>
                                    {item.desc && (
                                        <p className='mt-1 text-[0.9rem] leading-relaxed text-[#17181a]/65'>{item.desc}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {section.footer && <p className='mt-10 text-sm text-[#17181a]/60 italic'>{section.footer}</p>}
            </div>
        </div>
    );
};

export default MenuTabs;
