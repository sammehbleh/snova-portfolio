import fear from "../../img/fear.jpg";
import anger from "../../img/anger.png";
import joker from "../../img/joker.jpg";
import alien from "../../img/alien.jpg";
import animals from "../../img/animals.jpg";
import characters from "../../img/characters.jpg";
import cheezy from "../../img/cheezy.jpg";
import chipsAhoy from "../../img/ChipsAhoy.jpg";
import crunch from "../../img/crunch.jpg";
import dino from "../../img/Dino.jpg";
import eggs from "../../img/eggs.jpg";
import frenchfries from "../../img/frenchfries.jpg";
import kisses from "../../img/kisses.jpg";
import kitkat from "../../img/kitkat.jpg";
import kopiko from "../../img/kopiko.jpg";
import lays from "../../img/lays.jpg";
import minion from "../../img/minion.jpg";
import multiple from "../../img/multiple.jpg";
import oishi from "../../img/oishi.jpg";
import pennywise from "../../img/pennywise.jpg";
import purpleminion from "../../img/purpleminion.jpg";

export type Artwork = {
  id: number;
  title: string;
  medium: string;
  year: string;
  madeDate: string;
  dimensions: string;
  availability: string;
  description: string;
  img: string;
};

/* The four pieces featured on the landing page's Portfolio section */
export const FEATURED_ARTWORKS: Artwork[] = [
  {
    id: 1,
    title: "Envy",
    medium: "Oil on Canvas",
    year: "2024",
    madeDate: "March 2024",
    dimensions: "36 x 48 in",
    availability: "Original available",
    description:
      "A profound exploration of the unknown, utilizing high-contrast shadows and layered textures to evoke a sense of visceral depth and introspection.",
    img: fear,
  },
  {
    id: 2,
    title: "Anger",
    medium: "Acrylic on Canvas",
    year: "2024",
    madeDate: "January 2024",
    dimensions: "30 x 40 in",
    availability: "Replica and print available",
    description:
      "Captured through vigorous brushwork and a vibrant palette, this piece translates raw emotion into a rhythmic, powerful visual experience.",
    img: anger,
  },
  {
    id: 3,
    title: "Joker",
    medium: "Mixed Media",
    year: "2024",
    madeDate: "May 2024",
    dimensions: "24 x 36 in",
    availability: "Print available",
    description:
      "A complex character study that balances light and darkness, employing mixed media to provide a contemporary edge and architectural depth.",
    img: joker,
  },
  {
    id: 4,
    title: "Multiple",
    medium: "Mixed Media",
    year: "2024",
    madeDate: "June 2024",
    dimensions: "30 x 40 in",
    availability: "Original available",
    description:
      "A layered composition of repeated forms, exploring rhythm and variation across a single canvas.",
    img: multiple,
  },
];

/* The rest of the collection, pulled from the local img folder */
export const COLLECTION_ARTWORKS: Artwork[] = [
  {
    id: 5,
    title: "Pennywise",
    medium: "Acrylic on Canvas",
    year: "2024",
    madeDate: "June 2024",
    dimensions: "24 x 30 in",
    availability: "Original available",
    description:
      "A theatrical, unsettling portrait that plays with color and shadow to capture the menace beneath the grin.",
    img: pennywise,
  },
  {
    id: 6,
    title: "French Fries",
    medium: "Oil on Canvas",
    year: "2024",
    madeDate: "July 2024",
    dimensions: "20 x 24 in",
    availability: "Replica and print available",
    description:
      "A playful, pop-art take on comfort food, rendered in bold color blocks and confident linework.",
    img: frenchfries,
  },
  {
    id: 7,
    title: "Oishi",
    medium: "Acrylic on Canvas",
    year: "2024",
    madeDate: "August 2024",
    dimensions: "20 x 24 in",
    availability: "Print available",
    description:
      "Vibrant packaging-inspired color study exploring nostalgia and everyday snack culture.",
    img: oishi,
  },
  {
    id: 8,
    title: "Kitkat",
    medium: "Mixed Media",
    year: "2024",
    madeDate: "August 2024",
    dimensions: "18 x 24 in",
    availability: "Original available",
    description:
      "Clean geometry and saturated color combine in this study of an everyday object made iconic.",
    img: kitkat,
  },
  {
    id: 9,
    title: "Purple Minion",
    medium: "Acrylic on Canvas",
    year: "2024",
    madeDate: "September 2024",
    dimensions: "24 x 30 in",
    availability: "Replica and print available",
    description:
      "A mischievous character study rendered with expressive brushwork and a punchy, saturated palette.",
    img: purpleminion,
  },
  {
    id: 10,
    title: "Alien",
    medium: "Oil on Canvas",
    year: "2024",
    madeDate: "September 2024",
    dimensions: "30 x 40 in",
    availability: "Original available",
    description:
      "An otherworldly figure study balancing eerie stillness with curious, expressive eyes.",
    img: alien,
  },
  {
    id: 11,
    title: "Minion",
    medium: "Acrylic on Canvas",
    year: "2024",
    madeDate: "October 2024",
    dimensions: "20 x 24 in",
    availability: "Print available",
    description:
      "A joyful, instantly recognizable character brought to life through layered color and texture.",
    img: minion,
  },
  {
    id: 12,
    title: "Crunch",
    medium: "Mixed Media",
    year: "2024",
    madeDate: "October 2024",
    dimensions: "18 x 24 in",
    availability: "Original available",
    description:
      "Bold typography and packaging color cues collide in this energetic mixed-media piece.",
    img: crunch,
  },
  {
    id: 13,
    title: "Cheezy",
    medium: "Acrylic on Canvas",
    year: "2024",
    madeDate: "November 2024",
    dimensions: "18 x 24 in",
    availability: "Replica and print available",
    description:
      "A warm, textured study in golds and oranges celebrating a familiar snack-time favorite.",
    img: cheezy,
  },
  {
    id: 14,
    title: "Chips Ahoy",
    medium: "Oil on Canvas",
    year: "2024",
    madeDate: "November 2024",
    dimensions: "24 x 30 in",
    availability: "Original available",
    description:
      "A nostalgic, richly textured piece exploring the comfort and familiarity of a classic treat.",
    img: chipsAhoy,
  },
  {
    id: 15,
    title: "Kopiko",
    medium: "Acrylic on Canvas",
    year: "2024",
    madeDate: "December 2024",
    dimensions: "18 x 24 in",
    availability: "Print available",
    description:
      "A rich, dark-toned still life drawing on familiar packaging cues and bold contrast.",
    img: kopiko,
  },
  {
    id: 16,
    title: "Eggs",
    medium: "Oil on Canvas",
    year: "2024",
    madeDate: "December 2024",
    dimensions: "20 x 24 in",
    availability: "Original available",
    description:
      "A quiet still life study in soft light, focused on form, texture, and simplicity.",
    img: eggs,
  },
  {
    id: 17,
    title: "Animals",
    medium: "Mixed Media",
    year: "2024",
    madeDate: "December 2024",
    dimensions: "30 x 40 in",
    availability: "Original available",
    description:
      "An expressive ensemble piece bringing together a menagerie of figures in a single, lively composition.",
    img: animals,
  },
  {
    id: 18,
    title: "Characters",
    medium: "Mixed Media",
    year: "2025",
    madeDate: "January 2025",
    dimensions: "24 x 36 in",
    availability: "Original available",
    description:
      "A collage of familiar faces brought together in a single frame, each rendered with its own distinct texture and mood.",
    img: characters,
  },
  {
    id: 19,
    title: "Dino",
    medium: "Acrylic on Canvas",
    year: "2025",
    madeDate: "January 2025",
    dimensions: "20 x 24 in",
    availability: "Print available",
    description:
      "A playful character study rendered in warm tones, balancing charm with confident linework.",
    img: dino,
  },
  {
    id: 20,
    title: "Kisses",
    medium: "Oil on Canvas",
    year: "2025",
    madeDate: "February 2025",
    dimensions: "18 x 24 in",
    availability: "Replica and print available",
    description:
      "A tender, intimate study built from soft layered color and gentle, deliberate brushwork.",
    img: kisses,
  },
  {
    id: 21,
    title: "Lays",
    medium: "Acrylic on Canvas",
    year: "2025",
    madeDate: "February 2025",
    dimensions: "18 x 24 in",
    availability: "Original available",
    description:
      "A bold, packaging-inspired still life exploring color, branding, and everyday nostalgia.",
    img: lays,
  },
];

/* Full gallery: the 3 featured pieces plus everything else in the collection */
export const GALLERY_ARTWORKS: Artwork[] = [...FEATURED_ARTWORKS, ...COLLECTION_ARTWORKS];
