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
  /* Public-facing label shown on showcase grids in place of the title */
  category: "Characters" | "3D/Semi-Realistic";
  medium: string;
  dimensions: string;
  availability: string;
  img: string;
};

/* The six pieces featured on the landing page's Portfolio section */
export const FEATURED_ARTWORKS: Artwork[] = [
  {
    id: 21,
    title: "Lays",
    category: "3D/Semi-Realistic",
    medium: "Mixed Media; Colored Pencil, Colored Marker and Acrylic Paint",
    dimensions: "1/8 Illustration Board",
    availability: "Sold",
    img: lays,
  },
  {
    id: 13,
    title: "Cheezy",
    category: "3D/Semi-Realistic",
    medium: "Mixed Media; Colored Pencil, Colored Marker and Acrylic Paint",
    dimensions: "1/8 Illustration Board",
    availability: "Sold",
    img: cheezy,
  },
  {
    id: 3,
    title: "Joker",
    category: "Characters",
    medium: "Mixed Media; Colored Pencil, Colored Marker and Acrylic Paint",
    dimensions: "1/8 Illustration Board",
    availability: "Sold",
    img: joker,
  },
  {
    id: 5,
    title: "Pennywise",
    category: "Characters",
    medium: "Mixed Media; Colored Pencil, Colored Marker and Acrylic Paint",
    dimensions: "1/8 Illustration Board",
    availability: "Sold",
    img: pennywise,
  },
  {
    id: 16,
    title: "Eggs",
    category: "3D/Semi-Realistic",
    medium: "Mixed Media; Colored Pencil, Colored Marker and Acrylic Paint",
    dimensions: "Half of A4",
    availability: "Sold",
    img: eggs,
  },
  {
    id: 7,
    title: "Oishi",
    category: "3D/Semi-Realistic",
    medium: "Mixed Media; Colored Pencil, Colored Marker and Acrylic Paint",
    dimensions: "1/8 Illustration Board",
    availability: "Sold",
    img: oishi,
  },
];

/* The rest of the collection, pulled from the local img folder */
export const COLLECTION_ARTWORKS: Artwork[] = [
  {
    id: 1,
    title: "Envy",
    category: "Characters",
    medium: "Mixed Media; Colored Pencil, Colored Marker and Acrylic Paint",
    dimensions: "Half of A4",
    availability: "Sold",
    img: fear,
  },
  {
    id: 2,
    title: "Anger",
    category: "Characters",
    medium: "Mixed Media; Colored Pencil, Colored Marker and Acrylic Paint",
    dimensions: "Half of A4",
    availability: "Sold",
    img: anger,
  },
  {
    id: 4,
    title: "Multiple",
    category: "3D/Semi-Realistic",
    medium: "Mixed Media; Colored Pencil, Colored Marker and Acrylic Paint",
    dimensions: "1/8 Illustration Board",
    availability: "Sold",
    img: multiple,
  },
  {
    id: 6,
    title: "French Fries",
    category: "3D/Semi-Realistic",
    medium: "Mixed Media; Colored Pencil, Colored Marker and Acrylic Paint",
    dimensions: "1/8 Illustration Board",
    availability: "Sold",
    img: frenchfries,
  },
  {
    id: 8,
    title: "Kitkat",
    category: "3D/Semi-Realistic",
    medium: "Mixed Media; Colored Pencil, Colored Marker and Acrylic Paint",
    dimensions: "1/8 Illustration Board",
    availability: "Sold",
    img: kitkat,
  },
  {
    id: 9,
    title: "Purple Minion",
    category: "Characters",
    medium: "Mixed Media; Colored Pencil, Colored Marker and Acrylic Paint",
    dimensions: "1/8 Illustration Board",
    availability: "Sold",
    img: purpleminion,
  },
  {
    id: 10,
    title: "Mike Watowski",
    category: "Characters",
    medium: "Mixed Media; Colored Pencil, Colored Marker and Acrylic Paint",
    dimensions: "1/8 Illustration Board",
    availability: "Sold",
    img: alien,
  },
  {
    id: 11,
    title: "Minion",
    category: "Characters",
    medium: "Mixed Media; Colored Pencil, Colored Marker and Acrylic Paint",
    dimensions: "1/8 Illustration Board",
    availability: "Sold",
    img: minion,
  },
  {
    id: 12,
    title: "Crunch",
    category: "3D/Semi-Realistic",
    medium: "Mixed Media; Colored Pencil, Colored Marker and Acrylic Paint",
    dimensions: "1/8 Illustration Board",
    availability: "Sold",
    img: crunch,
  },
  {
    id: 14,
    title: "Chips Ahoy",
    category: "3D/Semi-Realistic",
    medium: "Mixed Media; Colored Pencil, Colored Marker and Acrylic Paint",
    dimensions: "1/8 Illustration Board",
    availability: "Sold",
    img: chipsAhoy,
  },
  {
    id: 15,
    title: "Kopiko",
    category: "3D/Semi-Realistic",
    medium: "Mixed Media; Colored Pencil, Colored Marker and Acrylic Paint",
    dimensions: "Half of A4",
    availability: "Sold",
    img: kopiko,
  },
  {
    id: 17,
    title: "Animals",
    category: "3D/Semi-Realistic",
    medium: "Mixed Media; Colored Pencil, Colored Marker and Acrylic Paint",
    dimensions: "1/8 Illustration Board",
    availability: "Sold",
    img: animals,
  },
  {
    id: 18,
    title: "Characters",
    category: "3D/Semi-Realistic",
    medium: "Mixed Media; Colored Pencil, Colored Marker and Acrylic Paint",
    dimensions: "1/8 Illustration Board",
    availability: "Sold",
    img: characters,
  },
  {
    id: 19,
    title: "Dino",
    category: "3D/Semi-Realistic",
    medium: "Mixed Media; Colored Pencil, Colored Marker and Acrylic Paint",
    dimensions: "1/8 Illustration Board",
    availability: "Sold",
    img: dino,
  },
  {
    id: 20,
    title: "Kisses",
    category: "3D/Semi-Realistic",
    medium: "Mixed Media; Colored Pencil, Colored Marker and Acrylic Paint",
    dimensions: "1/8 Illustration Board",
    availability: "Sold",
    img: kisses,
  },
];

/* Full gallery: the featured pieces plus everything else in the collection */
export const GALLERY_ARTWORKS: Artwork[] = [...FEATURED_ARTWORKS, ...COLLECTION_ARTWORKS];
