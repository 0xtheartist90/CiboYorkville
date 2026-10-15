import ResponsiveImg from '@/components/responsive-img';
import { aspect } from '@/lib/responsive';

// Cibo's own dish photos, kept at their natural proportions.
const DISHES = [
    { src: '/images/tagliatelle-mushroom.jpg', alt: 'Tagliatelle with wild mushrooms and shaved parmigiano' },
    { src: '/images/grilled-calamari.jpg', alt: 'Grilled whole calamari over greens with diced tomato and lemon' },
    { src: '/images/prosciutto-pizza.jpg', alt: 'A slice of pizza with prosciutto di Parma and arugula' },
    { src: '/images/pappardelle-ragu.jpg', alt: 'Fresh pappardelle in ragu with basil' },
    { src: '/images/short-rib-eggs.jpg', alt: 'Braised short rib with crispy onions, mushrooms and two fried eggs' },
    { src: '/images/pasta-gnocchi.jpg', alt: 'House-made gnocchi with basil beside fresh pasta' },
    { src: '/images/salmon-rose.jpg', alt: 'Grilled Atlantic salmon with asparagus beside a glass of rosé' },
    { src: '/images/pizza-yolk.jpg', alt: 'Blistered pizza with yellow cherry tomatoes and shaved parmigiano' }
];

// A slow strip of dishes running under the menu. The list is rendered twice and the track slides
// left by half its width, so the loop is seamless (spacing is a margin on each photo, not a gap, so
// both halves are exactly equal). It pauses on hover and stands still for
// visitors who prefer reduced motion.
const FoodMarquee = () => (
    <div className='overflow-hidden' aria-label='Dishes from the Cibo kitchen'>
        <div className='food-marquee flex w-max hover:[animation-play-state:paused]'>
            {[...DISHES, ...DISHES].map((dish, i) => (
                <ResponsiveImg
                    key={`${dish.src}-${i}`}
                    src={dish.src}
                    alt={i < DISHES.length ? dish.alt : ''}
                    aria-hidden={i >= DISHES.length}
                    sizes='(max-width: 767px) 50vw, 25vw'
                    loading='lazy'
                    style={{ aspectRatio: aspect(dish.src) }}
                    className='mr-2 h-[220px] w-auto shrink-0 md:h-[320px]'
                />
            ))}
        </div>
    </div>
);

export default FoodMarquee;
