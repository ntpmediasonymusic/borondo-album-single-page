import { useState, useEffect, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SectionHeader } from "./SectionLabel";

import artistDark from "../../imports/download-1.jpg";
import albumCover from "../../imports/Beele-borondo-album-cover.jpg";

import MadKoknut from "../../imports/track-by-track/5020_Beeele_2026_Sessions_Cover Arts_Mad Koknut_1_E.jpg";
import NoTieneSentido from "../../imports/track-by-track/5020_Beeele_2026_Sessions_Cover Arts_No Tiene Sentido_2_E.jpg";
import ByeBye from "../../imports/track-by-track/5020_Beeele_2026_Sessions_Cover Arts_Bye Bye_2_E.jpg";
import EnLaMia from "../../imports/track-by-track/5020_Beeele_2026_Sessions_Cover Arts_En La Mia_1_E.jpg";
import Quedate from "../../imports/track-by-track/5020_Beeele_2026_Sessions_Cover Arts_Quédate_2_E.jpg";
import TopDiesel from "../../imports/track-by-track/5020_Beeele_2026_Sessions_Cover Arts_top diesel_1_E.jpg";
import MiRefe from "../../imports/track-by-track/5020_Beeele_2026_Sessions_Cover Arts_Mi Refe_1_E.jpg";
import FrenteAlmar from "../../imports/track-by-track/5020_Beeele_2026_Sessions_Cover Arts_Frente Al Mar_2_E.jpg";
import SiTePillara from "../../imports/track-by-track/5020_Beeele_2026_Sessions_Cover Arts_Si Te Pillara_2_E.jpg";
import UnaCurita from "../../imports/track-by-track/5020_Beeele_2026_Sessions_Cover Arts_Una Curita_2_E.jpg";
import Sobelove from "../../imports/track-by-track/5020_Beeele_2026_Sessions_Cover Arts_Sobelove_2_E.jpg";
import EstrellaFugaz from "../../imports/track-by-track/5020_Beeele_2026_Sessions_Cover Arts_Estrella Fugaz_2_E.jpg";

// ─── Real Borondo track listing ────────────────────────────────────────────
const PLAYLIST_BASE =
  "https://www.youtube.com/playlist?list=PL-WV71xWJQL8YndZbY4j-JpoAg79xOvnI";

interface Track {
  id: number;
  title: string;
  ft?: string;
  bonus?: boolean;
  note: string;
  image: string;
  youtubeUrl: string;
  spotifyUrl: string;
  appleMusicUrl: string;
  youtubeMusicUrl: string;
  amazonMusicUrl: string;
  deezerUrl: string;
}

const TRACKS: Track[] = [
  {
    id: 1,
    title: "anhélame",
    note: "Romántica y vulnerable; se siente como una súplica desde el deseo.",
    image: albumCover,
    youtubeUrl: "https://www.youtube.com/watch?v=94Ecpkx6NhI",
    spotifyUrl: "https://open.spotify.com/track/0oJuzeiW6b4mtLgAW3wQFx",
    appleMusicUrl: "https://music.apple.com/song/anh%C3%A9lame/1812536834",
    youtubeMusicUrl: "https://music.youtube.com/watch?v=DqoV4-8xHTY",
    amazonMusicUrl: "https://music.amazon.com/tracks/B0F7JVBXW1",
    deezerUrl: "https://www.deezer.com/track/3353337051",
  },
  {
    id: 2,
    title: "que te vaya bien",
    note: "El adios que no suena como adios.",
    image: albumCover,
    youtubeUrl: "https://www.youtube.com/watch?v=yrsofxLMweE",
    spotifyUrl: "https://open.spotify.com/track/4nrTw6teGIWRvc929Ap2wM",
    appleMusicUrl: "https://music.apple.com/mx/song/be%C3%A9le-habla-sobre-que-te-vaya-bien/1823331134",
    youtubeMusicUrl: "https://music.youtube.com/watch?v=O3Pd_0Oekag",
    amazonMusicUrl: "https://music.amazon.com/tracks/B0F7JXZJJ3",
    deezerUrl: "https://www.deezer.com/track/3353337061",
  },
  {
    id: 3,
    title: "mad koknut",
    note: "Cuando el ritmo manda y el cerebro descansa.",
    image: MadKoknut,
    youtubeUrl: "https://www.youtube.com/watch?v=xBStL5k-gVk",
    spotifyUrl: "https://open.spotify.com/album/7mzwp5QdtTDgThkr8egt4A",
    appleMusicUrl: "https://music.apple.com/album/mad-koknut-bundle-single/1896059423",
    youtubeMusicUrl: "https://music.youtube.com/watch?v=xBStL5k-gVk&si=HbTvFiH3tbocgXpi",
    amazonMusicUrl: "https://music.amazon.com.mx/albums/B0GZ8NSD4H",
    deezerUrl: "https://link.deezer.com/s/33fSCXcI2ZL8q8mWRSAvT",
  },
  {
    id: 4,
    title: "una vez al mes",
    note: "Ese momento que todos vivimos y nadie nombra.",
    image: albumCover,
    youtubeUrl: "https://youtu.be/XpE5Nf4uRmg?si=rXsTAsYx_jwhRx29",
    spotifyUrl: "https://open.spotify.com/intl-es/track/0G3UdBIKyA0JWHrNsEoRao?si=e0a97cacd02449b7",
    appleMusicUrl: "https://music.apple.com/us/song/una-vez-al-mes/1812537115",
    youtubeMusicUrl: "https://music.youtube.com/watch?v=cMDc1np6NJk&si=Aq2i7LcBJ6nuVenR",
    amazonMusicUrl: "https://music.amazon.com.mx/albums/B0F7K3ZPRJ?marketplaceId=ART4WZ8MWBX2Y&musicTerritory=MX&ref=dm_sh_TXP5fW1JfAvaD13HkxIlXVjVk&trackAsin=B0F7JM28XZ",
    deezerUrl: "https://link.deezer.com/s/33fSPMCM0sitnUG9RX7Cr",
  },
  {
    id: 5,
    title: "si mañana me muero",
    ft: "Thisizlondon",
    note: "Beéle terminó la canción cuando cumplió 22 años. La canción empieza con una frase que le dijo su mamá: “Se olvidarán de ti, de lo que hiciste, ¡nunca!”. Con esa frase comenzó a asimilar muchísimas cosas y se preguntó: “¿Y si mañana me muero?”. Pero no lo dice de forma literal, en el sentido de la muerte, sino como una inspiración para vivir el día a día, pensar en lo bonito, vivir la vida de la mejor manera y tener esperanza.",
    image: albumCover,
    youtubeUrl: "https://youtu.be/5pRHLh-F3lw?si=P6yVrgDx4VBOW8H6",
    spotifyUrl: "https://open.spotify.com/intl-es/track/0h1DSQbLoW58G3DDxmhxKx?si=5eed1bcfd7ed45cb",
    appleMusicUrl: "https://music.apple.com/us/song/si-ma%C3%B1ana-me-muero/1812537118",
    youtubeMusicUrl: "https://music.youtube.com/watch?v=iYa2hUb5WNI&si=BEKrvFiEmXqeJPap",
    amazonMusicUrl: "https://music.amazon.com.mx/albums/B0F7K3ZPRJ?marketplaceId=ART4WZ8MWBX2Y&musicTerritory=MX&ref=dm_sh_qJ5oIwAW4GQGOySUjOFEsahyS&trackAsin=B0F7JM57VK",
    deezerUrl: "https://link.deezer.com/s/33fTbs86Ko6u52Y0XlGl4",
  },
  {
    id: 6,
    title: "no tiene sentido",
    note: "Esta es la canción de la fiesta y de la frescura. Es el merenguetón que nos pondrá a vibrar y a bailar a todos.",
    image: NoTieneSentido,
    youtubeUrl: "https://youtu.be/R8p956JDOjA?si=1DwwQSvo4LZ-JdsL",
    spotifyUrl: "https://open.spotify.com/intl-es/album/2uRG66QJGDX3frWa67CQdP?si=075a827ab7604c35",
    appleMusicUrl: "https://music.apple.com/us/album/no-tiene-sentido-bundle-single/1896051020",
    youtubeMusicUrl: "https://music.youtube.com/watch?v=R8p956JDOjA&si=XxM0UxyVOQ7ANj-m",
    amazonMusicUrl: "https://music.amazon.com.mx/albums/B0GZ8QF9QR?marketplaceId=ART4WZ8MWBX2Y&musicTerritory=MX&ref=dm_sh_BRRguSUShGrQSKIuhuIDzfzEM&trackAsin=B0GZ8BQNHC",
    deezerUrl: "https://link.deezer.com/s/33fTtgYQhWbq0KAqmvh5M",
  },
  {
    id: 7,
    title: "arena",
    ft: "Carla Morrison",
    note: "Interpretar un poema con Carla Morrison, hacerlo real y de una forma tan inesperada, ha sido lo más chévere y lo más bacano de compartir con ella esta canción. Todo surgió de una manera muy orgánica, donde el color y la fusión hacen que sea aún más especial.",
    image: artistDark,
    youtubeUrl: "https://www.youtube.com/watch?v=pz6EOhkUzd8",
    spotifyUrl: "https://open.spotify.com/track/1whs2eO84P6NRtmDQN2YTl",
    appleMusicUrl: "https://music.apple.com/es/song/arena/1812537129",
    youtubeMusicUrl: "https://music.youtube.com/watch?index=0&list=OLAK5uy_n7hCkejilQO3O3ygI0SkH0oawgFW8EeWI&v=pz6EOhkUzd8",
    amazonMusicUrl: "https://music.amazon.com.mx/tracks/B0FJCQ2X36",
    deezerUrl: "https://www.deezer.com/mx/track/3353337111"
  },
  {
    id: 8,
    title: "quédate",
    note: "Quédate - Esa canción que puedes gritar y prefieres callar, pero bailar al mismo tiempo. Comparte el sentimiento de poder bailar con esa persona y decirle al oído: “Quédate”.",
    image: Quedate,
    youtubeUrl: "https://www.youtube.com/results?search_query=Be%C3%A9le+qu%C3%A9date+5020+RCRDS+Sessions",
    spotifyUrl: "https://open.spotify.com/track/6OxAfOA7upecHKTlSA8NbJ",
    appleMusicUrl: "https://music.apple.com/mx/song/qu%C3%A9date-5020-rcrds-sessions/1854979578",
    youtubeMusicUrl: "https://music.youtube.com/search?q=Be%C3%A9le+qu%C3%A9date+5020+RCRDS+Sessions",
    amazonMusicUrl: "https://music.amazon.com/search/Be%C3%A9le%20qu%C3%A9date%205020%20RCRDS%20Sessions",
    deezerUrl: "https://www.deezer.com/search/Be%C3%A9le%20qu%C3%A9date%205020%20RCRDS%20Sessions"
  },
  {
    id: 9,
    title: "top diesel",
    note: "En esta canción cuenta una experiencia que a todos, en algún momento, nos ha pasado: encontrarnos con alguien que nos vuelve locos; alguien que apenas conoces y con quien ya te imaginas la vida y la otra vida, llevándonos a la locura automática. De esas mujeres que tienen un top diesel, mientras tienes un amigo que te dice: “No te vayas a enamorar”, pero el corazón no hace caso.",
    image: TopDiesel,
    youtubeUrl: "https://www.youtube.com/results?search_query=Be%C3%A9le+top+diesel+5020+RCRDS+Sessions",
    spotifyUrl: "https://open.spotify.com/track/3Jy9Lp1bw897lH5J6B2XiZ",
    appleMusicUrl: "https://music.apple.com/mx/song/top-diesel-5020-rcrds-sessions/1854979576",
    youtubeMusicUrl: "https://music.youtube.com/search?q=Be%C3%A9le+top+diesel+5020+RCRDS+Sessions",
    amazonMusicUrl: "https://music.amazon.com/tracks/B0GZ929VT3",
    deezerUrl: "https://www.deezer.com/search/Be%C3%A9le%20top%20diesel%205020%20RCRDS%20Sessions"
  },
  {
    id: 10,
    title: "mi refe",
    note: "Romántica e intensa; alguien se vuelve tu punto de referencia emocional.",
    image: MiRefe,
    youtubeUrl: "https://www.youtube.com/watch?v=c-tHTv5gJg4",
    spotifyUrl: "https://open.spotify.com/track/0rz2dpy0vEbCNow0I7RJ3e",
    appleMusicUrl: "https://music.apple.com/mx/song/mi-refe-5020-rcrds-sessions/1883725342",
    youtubeMusicUrl: "https://music.youtube.com/watch?v=c-tHTv5gJg4",
    amazonMusicUrl: "https://music.amazon.com/tracks/B0GRWQNTQK",
    deezerUrl: "https://www.deezer.com/search/Be%C3%A9le%20mi%20refe%205020%20RCRDS%20Sessions"
  },
  {
    id: 11,
    title: "Dios me oyó",
    ft: "Marc Anthony",
    note: "Agradecida y emotiva; suena a una bendición que por fin llegó.",
    image: albumCover,
    youtubeUrl: "https://www.youtube.com/results?search_query=Be%C3%A9le+Dios+me+oy%C3%B3+Marc+Anthony",
    spotifyUrl: "https://open.spotify.com/track/672MSkU0EOoy8n4xfettT2",
    appleMusicUrl: "https://music.apple.com/mx/song/dios-me-oy%C3%B3/1812537138",
    youtubeMusicUrl: "https://music.youtube.com/search?q=Be%C3%A9le+Dios+me+oy%C3%B3+Marc+Anthony",
    amazonMusicUrl: "https://music.amazon.com/search/Be%C3%A9le%20Dios%20me%20oy%C3%B3%20Marc%20Anthony",
    deezerUrl: "https://www.deezer.com/search/Be%C3%A9le%20Dios%20me%20oy%C3%B3%20Marc%20Anthony"
  },
  {
    id: 12,
    title: "frente al mar",
    note: "Nostálgica y luminosa; como pensar en alguien con el mar de fondo.",
    image: FrenteAlmar,
    youtubeUrl: "https://www.youtube.com/watch?v=Jx-4hNBspvg",
    spotifyUrl: "https://open.spotify.com/track/5M4lVQk1j7ztnegR9Xddq4",
    appleMusicUrl: "https://music.apple.com/mx/song/frente-al-mar-5020-rcrds-sessions/1883725168",
    youtubeMusicUrl: "https://music.youtube.com/watch?v=Jx-4hNBspvg",
    amazonMusicUrl: "https://music.amazon.com/tracks/B0GZ9CP66N",
    deezerUrl: "https://www.deezer.com/search/Be%C3%A9le%20frente%20al%20mar%205020%20RCRDS%20Sessions"
  },
  {
    id: 13,
    title: "si te pillara",
    note: "Canción que hace referencia a una situación de la que a muchos les cuesta hablar: que te estén poniendo los cachos, siendo infiel. Esta canción lo dice de una manera tan jocosa que no sabes si reír o llorar.",
    image: SiTePillara,
    youtubeUrl: "https://www.youtube.com/results?search_query=Be%C3%A9le+si+te+pillara+5020+RCRDS+Sessions",
    spotifyUrl: "https://open.spotify.com/track/4MeAI7UerER6foCiFdgOBL",
    appleMusicUrl: "https://music.apple.com/mx/song/si-te-pillara-5020-rcrds-sessions/1854979577",
    youtubeMusicUrl: "https://music.youtube.com/search?q=Be%C3%A9le+si+te+pillara+5020+RCRDS+Sessions",
    amazonMusicUrl: "https://music.amazon.com/tracks/B0GZ8PR2JW",
    deezerUrl: "https://www.deezer.com/search/Be%C3%A9le%20si%20te%20pillara%205020%20RCRDS%20Sessions"
  },
  {
    id: 14,
    title: "i miss you",
    note: "Melancólica y vulnerable; se siente como extrañar aunque duela admitirlo.",
    image: albumCover,
    youtubeUrl: "https://www.youtube.com/watch?v=FV2VaCOO4xg",
    spotifyUrl: "https://open.spotify.com/track/6L6Jk9qfsjsnC3ICugMGC0",
    appleMusicUrl: "https://music.apple.com/mx/song/i-miss-you-5020-rcrds-sessions/1883725350",
    youtubeMusicUrl: "https://music.youtube.com/watch?v=FV2VaCOO4xg",
    amazonMusicUrl: "https://music.amazon.com/tracks/B0GRWPD8J1",
    deezerUrl: "https://www.deezer.com/search/Be%C3%A9le%20i%20miss%20you%205020%20RCRDS%20Sessions"
  },
  {
    id: 15,
    title: "hotel east",
    note: "Hotel en Miami, “el hotel del área”, en el cual ha escrito muchas canciones y que ha sido un lugar creativo para él. En esta canción expresa cómo se siente en esa área, su cultura, los sonidos de la costa y habla de cosas que pasan en la vida.",
    image: albumCover,
    youtubeUrl: "https://www.youtube.com/results?search_query=Be%C3%A9le+hotel+east",
    spotifyUrl: "https://open.spotify.com/track/6Swnjm3L1eUmojj01qemc1",
    appleMusicUrl: "https://music.apple.com/mx/song/hotel-east/1812537516",
    youtubeMusicUrl: "https://music.youtube.com/search?q=Be%C3%A9le+hotel+east",
    amazonMusicUrl: "https://music.amazon.com/search/Be%C3%A9le%20hotel%20east",
    deezerUrl: "https://www.deezer.com/search/Be%C3%A9le%20hotel%20east"
  },
  {
    id: 16,
    title: "una curita por favor",
    note: "Cuando escribí esta canción me desangraba el alma. En esta canción se desahoga, suelta muchas cosas y entiende que todo pasa. A veces uno necesita una curita, y esa fue la mía.",
    image: UnaCurita,
    youtubeUrl: "https://www.youtube.com/results?search_query=Be%C3%A9le+una+curita+por+favor+5020+RCRDS+Sessions",
    spotifyUrl: "https://open.spotify.com/track/4cDqBOtbW9lr26DAtkS6x4",
    appleMusicUrl: "https://music.apple.com/mx/song/una-curita-por-favor-5020-rcrds-sessions/1883725346",
    youtubeMusicUrl: "https://music.youtube.com/search?q=Be%C3%A9le+una+curita+por+favor+5020+RCRDS+Sessions",
    amazonMusicUrl: "https://music.amazon.com/search/Be%C3%A9le%20una%20curita%20por%20favor%205020%20RCRDS%20Sessions",
    deezerUrl: "https://www.deezer.com/search/Be%C3%A9le%20una%20curita%20por%20favor%205020%20RCRDS%20Sessions"
  },
  {
    id: 17,
    title: "borondo",
    note: "Borondo significa andar en parche, andar con gente, ir a dar una vuelta. Por ejemplo: “Vamos de borondo” o “vamos a dar un borondo”. Esta canción muestra, desde la letra, el sentimiento de estar “parchado” con tu gente, de armar planes, estar jodiendo, disfrutando del barrio y del ambiente en el que te sientes cómodo.",
    image: albumCover,
    youtubeUrl: "https://www.youtube.com/results?search_query=Be%C3%A9le+borondo",
    spotifyUrl: "https://open.spotify.com/track/60RgDM1qDQ22HpfsK9Ul4h",
    appleMusicUrl: "https://music.apple.com/mx/song/borondo/1812537524",
    youtubeMusicUrl: "https://music.youtube.com/search?q=Be%C3%A9le+borondo",
    amazonMusicUrl: "https://music.amazon.com/search/Be%C3%A9le%20borondo",
    deezerUrl: "https://www.deezer.com/search/Be%C3%A9le%20borondo"
  },
  {
    id: 18,
    title: "sobelove",
    note: "Ligera y seductora; tiene romance relajado y sin presión.",
    image: Sobelove,
    youtubeUrl: "https://www.youtube.com/watch?v=Oh4iN8LZO9o",
    spotifyUrl: "https://open.spotify.com/track/0fjBI5l3lDSLOHit4iqW8D",
    appleMusicUrl: "https://music.apple.com/mx/song/sobelove-5020-rcrds-sessions/1883725344",
    youtubeMusicUrl: "https://music.youtube.com/watch?v=Oh4iN8LZO9o",
    amazonMusicUrl: "https://music.amazon.com/tracks/B0GZ8VVF74",
    deezerUrl: "https://www.deezer.com/search/Be%C3%A9le%20sobelove%205020%20RCRDS%20Sessions"
  },
  {
    id: 19,
    title: "en la mía",
    note: "Canción que nos representa a muchos cuando estamos buscando motivación y estamos enfocados; cuando sabemos de qué estamos hechos. Muchos se van a inspirar en ti, pero “tú en la tuya y yo en la mía”. Cada uno tiene su espacio y su momento, y todos pueden brillar.",
    image: EnLaMia,
    youtubeUrl: "https://www.youtube.com/results?search_query=Be%C3%A9le+en+la+m%C3%ADa+5020+RCRDS+Sessions",
    spotifyUrl: "https://open.spotify.com/track/6G43XUfN72yhdnuud2oeiK",
    appleMusicUrl: "https://music.apple.com/mx/song/en-la-m%C3%ADa-5020-rcrds-sessions/1854979579",
    youtubeMusicUrl: "https://music.youtube.com/search?q=Be%C3%A9le+en+la+m%C3%ADa+5020+RCRDS+Sessions",
    amazonMusicUrl: "https://music.amazon.com/search/Be%C3%A9le%20en%20la%20m%C3%ADa%205020%20RCRDS%20Sessions",
    deezerUrl: "https://www.deezer.com/search/Be%C3%A9le%20en%20la%20m%C3%ADa%205020%20RCRDS%20Sessions"
  },
  {
    id: 20,
    title: "estrella fugaz",
    note: "Estaba en Ibiza y se fue a ver el atardecer en la playa. Había una noche estrellada y luna llena, y se puso a pensar que hacía mucho tiempo no veía una estrella fugaz. Entonces manifestó que pasara una estrella fugaz para preguntar: “¿Qué vamos a hacer tú y yo?”.",
    image: EstrellaFugaz,
    youtubeUrl: "https://www.youtube.com/watch?v=vlSeGXQBeJo",
    spotifyUrl: "https://open.spotify.com/track/1vH3qdvXqkv5RkBrM4zWtj",
    appleMusicUrl: "https://music.apple.com/mx/song/estrella-fugaz-5020-rcrds-sessions/1883725169",
    youtubeMusicUrl: "https://music.youtube.com/watch?v=vlSeGXQBeJo",
    amazonMusicUrl: "https://music.amazon.com/tracks/B0GRX23621",
    deezerUrl: "https://www.deezer.com/search/Be%C3%A9le%20estrella%20fugaz%205020%20RCRDS%20Sessions"
  },
  {
    id: 21,
    title: "bye",
    note: "Muchas veces en la vida tenemos que enfrentar y aceptar situaciones que nos hacen ser más fuertes, entender que no estamos en el lugar correcto y aceptarlo.",
    image: ByeBye,
    youtubeUrl: "https://www.youtube.com/results?search_query=Be%C3%A9le+bye+5020+RCRDS+Sessions",
    spotifyUrl: "https://open.spotify.com/track/5KCi50kiS31CEko1Q96DJV",
    appleMusicUrl: "https://music.apple.com/mx/song/bye-5020-rcrds-sessions/1883725343",
    youtubeMusicUrl: "https://music.youtube.com/search?q=Be%C3%A9le+bye+5020+RCRDS+Sessions",
    amazonMusicUrl: "https://music.amazon.com/search/Be%C3%A9le%20bye%205020%20RCRDS%20Sessions",
    deezerUrl: "https://www.deezer.com/search/Be%C3%A9le%20bye%205020%20RCRDS%20Sessions"
  },
  {
    id: 22,
    title: "ya q",
    note: "El desamor te hace entender muchas cosas, y el “ya qué” ha sido una de ellas: “¿Ya qué se puede hacer?”. ¿Se murió? Ya qué. Toca aceptar, porque son vainas que pegan, golpes del camino.",
    image: albumCover,
    youtubeUrl: "https://www.youtube.com/results?search_query=Be%C3%A9le+ya+q",
    spotifyUrl: "https://open.spotify.com/track/7tVspvZ00pftZoGUSiYmPi",
    appleMusicUrl: "https://music.apple.com/mx/song/ya-q/1812537960",
    youtubeMusicUrl: "https://music.youtube.com/search?q=Be%C3%A9le+ya+q",
    amazonMusicUrl: "https://music.amazon.com/search/Be%C3%A9le%20ya%20q",
    deezerUrl: "https://www.deezer.com/search/Be%C3%A9le%20ya%20q"
  },
  {
    id: 23,
    title: "time and space",
    note: "Canción en inglés, un idioma que no habla, pero se atrevió y se puso ese reto para decirle a Dios tantas cosas que pasan en su vida, y que mucha gente no ve o no se da cuenta. Solo Dios sabe por lo que ha pasado, todo lo que quiere y todo lo que pide. “Necesito tiempo y espacio contigo (Dios), conmigo y con lo que quieras para mí”.",
    image: albumCover,
    youtubeUrl: "https://www.youtube.com/results?search_query=Be%C3%A9le+time+and+space",
    spotifyUrl: "https://open.spotify.com/track/2tXqLfvoCvJi6S86WEAEOG",
    appleMusicUrl: "https://music.apple.com/mx/song/time-and-space/1812537961",
    youtubeMusicUrl: "https://music.youtube.com/search?q=Be%C3%A9le+time+and+space",
    amazonMusicUrl: "https://music.amazon.com/search/Be%C3%A9le%20time%20and%20space",
    deezerUrl: "https://www.deezer.com/search/Be%C3%A9le%20time%20and%20space"
  },
  {
    id: 24,
    title: "algo bueno",
    note: "Esta canción la compuso después de una oración. Estaba en un momento de su vida en el que necesitaba encontrarse consigo mismo: “Me tuve que destruir y reconstruir”, para así llegar a este propósito y saber que algo bueno viene. “La música me ha salvado de muchas cosas”, y recordó a ese niño interior que tanto pedía llegar a donde está hoy. Es una canción escrita para él mismo.",
    image: albumCover,
    youtubeUrl: "https://www.youtube.com/watch?v=Ltazf7tVDxU",
    spotifyUrl: "https://open.spotify.com/track/0eW6P14Nc4BC3iip9qxYpc",
    appleMusicUrl: "https://music.apple.com/mx/song/algo-bueno-5020-rcrds-sessions/1854979580",
    youtubeMusicUrl: "https://music.youtube.com/watch?v=Ltazf7tVDxU",
    amazonMusicUrl: "https://music.amazon.com/search/Be%C3%A9le%20algo%20bueno%205020%20RCRDS%20Sessions",
    deezerUrl: "https://www.deezer.com/search/Be%C3%A9le%20algo%20bueno%205020%20RCRDS%20Sessions"
  },
  {
    id: 25,
    title: "morena",
    bonus: true,
    note: "Sensual y brillante; admiración directa por alguien que atrapa.",
    image: albumCover,
    youtubeUrl: "https://www.youtube.com/results?search_query=Be%C3%A9le+morena+5020+RCRDS+Sessions",
    spotifyUrl: "https://open.spotify.com/track/2pgvLK5eEKJwcVmWObF4LE",
    appleMusicUrl: "https://music.apple.com/search?term=Be%C3%A9le%20morena%205020%20RCRDS%20Sessions",
    youtubeMusicUrl: "https://music.youtube.com/search?q=Be%C3%A9le+morena+5020+RCRDS+Sessions",
    amazonMusicUrl: "https://music.amazon.com/search/Be%C3%A9le%20morena%205020%20RCRDS%20Sessions",
    deezerUrl: "https://www.deezer.com/search/Be%C3%A9le%20morena%205020%20RCRDS%20Sessions"
  },
  {
    id: 26,
    title: "hasta aquí llegué",
    bonus: true,
    note: "Bonus. El punto final que abre todo lo que sigue.",
    image: albumCover,
    youtubeUrl: "https://www.youtube.com/results?search_query=Nanpa+B%C3%A1sico+Be%C3%A9le+hasta+aqu%C3%AD+llegu%C3%A9",
    spotifyUrl: "https://open.spotify.com/track/4keKaI4pVDsW9S7HUIq8qf",
    appleMusicUrl: "https://music.apple.com/mx/song/hasta-aqu%C3%AD-llegu%C3%A9/1812537964",
    youtubeMusicUrl: "https://music.youtube.com/search?q=Nanpa+B%C3%A1sico+Be%C3%A9le+hasta+aqu%C3%AD+llegu%C3%A9",
    amazonMusicUrl: "https://music.amazon.com/search/Nanpa%20B%C3%A1sico%20Be%C3%A9le%20hasta%20aqu%C3%AD%20llegu%C3%A9",
    deezerUrl: "https://www.deezer.com/search/Nanpa%20B%C3%A1sico%20Be%C3%A9le%20hasta%20aqu%C3%AD%20llegu%C3%A9"
  },
];

// ─── Platform SVG Icons ────────────────────────────────────────────────────

function SpotifyIcon({ size = 13 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 16 16">
      <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.669 11.538a.5.5 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686m.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858m.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288" />
    </svg>
  );
}

function AppleMusicIcon({ size = 13 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 16 16">
      <path fillRule="evenodd" d="m10.995 0 .573.001q.241 0 .483.007c.35.01.705.03 1.051.093.352.063.68.166.999.329a3.36 3.36 0 0 1 1.47 1.468c.162.32.265.648.328 1 .063.347.084.7.093 1.051q.007.241.007.483l.001.573v5.99l-.001.573q0 .241-.008.483c-.01.35-.03.704-.092 1.05a3.5 3.5 0 0 1-.33 1 3.36 3.36 0 0 1-1.468 1.468 3.5 3.5 0 0 1-1 .33 7 7 0 0 1-1.05.092q-.241.007-.483.008l-.573.001h-5.99l-.573-.001q-.241 0-.483-.008a7 7 0 0 1-1.052-.092 3.6 3.6 0 0 1-.998-.33 3.36 3.36 0 0 1-1.47-1.468 3.6 3.6 0 0 1-.328-1 7 7 0 0 1-.093-1.05Q.002 11.81 0 11.568V5.005l.001-.573q0-.241.007-.483c.01-.35.03-.704.093-1.05a3.6 3.6 0 0 1 .329-1A3.36 3.36 0 0 1 1.9.431 3.5 3.5 0 0 1 2.896.1 7 7 0 0 1 3.95.008Q4.19.002 4.432 0h.573zm-.107 2.518-4.756.959H6.13a.66.66 0 0 0-.296.133.5.5 0 0 0-.16.31c-.004.027-.01.08-.01.16v5.952c0 .14-.012.275-.106.39-.095.115-.21.15-.347.177l-.31.063c-.393.08-.65.133-.881.223a1.4 1.4 0 0 0-.519.333 1.25 1.25 0 0 0-.332.995c.031.297.166.582.395.792.156.142.35.25.578.296.236.047.49.031.858-.043.196-.04.38-.102.555-.205a1.4 1.4 0 0 0 .438-.405 1.5 1.5 0 0 0 .233-.55c.042-.202.052-.386.052-.588V6.347c0-.276.08-.35.302-.404.024-.005 3.954-.797 4.138-.833.257-.049.378.025.378.294v3.524c0 .14-.001.28-.096.396-.094.115-.211.15-.348.178l-.31.062c-.393.08-.649.133-.88.223a1.4 1.4 0 0 0-.52.334 1.26 1.26 0 0 0-.34.994c.03.297.174.582.404.792a1.2 1.2 0 0 0 .577.294c.237.048.49.03.858-.044.197-.04.381-.098.556-.202a1.4 1.4 0 0 0 .438-.405q.173-.252.233-.549a2.7 2.7 0 0 0 .044-.589V2.865c0-.273-.143-.443-.4-.42-.04.003-.383.064-.424.073" />
    </svg>
  );
}

function YoutubeMusicIcon({ size = 13 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 16 16">
      <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
    </svg>
  );
}

function DeezerIcon({ size = 13 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 640 640">
      <path d="M78.8 165.1C70.6 165.1 64 191.6 64 224.3C64 257 70.6 283.5 78.8 283.5C87 283.5 93.6 257 93.6 224.3C93.6 191.6 87 165.1 78.8 165.1zM512.7 104.9C505 104.9 498.2 122 493.3 149C485.6 102.3 473.1 72 459.1 72C442.3 72 428 114.9 421.1 177.4C414.5 132 404.3 103.2 392.8 103.2C376.7 103.2 363.2 160.1 358.1 239.4C348.7 198.6 334.9 173.1 319.8 173.1C304.7 173.1 291 198.6 281.5 239.4C276.4 160.1 262.9 103.2 246.8 103.2C235.3 103.2 225.1 132 218.5 177.4C211.9 114.9 197.3 72 180.7 72C166.7 72 154.2 102.4 146.5 149C141.7 122 134.8 104.9 127.1 104.9C112.8 104.9 101.1 164.1 101.1 237C101.1 309.9 113 369.2 127.3 369.2C133.2 369.2 138.8 359.3 143.1 342.4C150 404.1 164.3 446.5 181.1 446.5C194.1 446.5 205.6 421 213.2 380.9C218.6 457.2 231.8 511.3 247.4 511.3C257.1 511.3 266 489.9 272.7 454.9C280.6 527.1 299 577.6 320.4 577.6C341.8 577.6 359.9 527.1 368.1 454.9C374.7 489.9 383.7 511.3 393.4 511.3C409 511.3 422.2 457.2 427.6 380.9C435.3 421 447 446.5 459.7 446.5C476.3 446.5 490.6 404.2 497.7 342.4C502 359.2 507.4 369.2 513.5 369.2C527.8 369.2 539.5 310 539.5 237.1C539.5 164.2 527 104.9 512.7 104.9zM561.2 165.1C553 165.1 546.4 191.6 546.4 224.3C546.4 257 553 283.5 561.2 283.5C569.4 283.5 576 257 576 224.3C576 191.6 569.4 165.1 561.2 165.1z" />
    </svg>
  );
}

function AmazonMusicIcon({ size = 13 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 16 16">
      <path d="M10.813 11.968c.157.083.36.074.5-.05l.005.005a90 90 0 0 1 1.623-1.405c.173-.143.143-.372.006-.563l-.125-.17c-.345-.465-.673-.906-.673-1.791v-3.3l.001-.335c.008-1.265.014-2.421-.933-3.305C10.404.274 9.06 0 8.03 0 6.017 0 3.77.75 3.296 3.24c-.047.264.143.404.316.443l2.054.22c.19-.009.33-.196.366-.387.176-.857.896-1.271 1.703-1.271.435 0 .929.16 1.188.55.264.39.26.91.257 1.376v.432q-.3.033-.621.065c-1.113.114-2.397.246-3.36.67C3.873 5.91 2.94 7.08 2.94 8.798c0 2.2 1.387 3.298 3.168 3.298 1.506 0 2.328-.354 3.489-1.54l.167.246c.274.405.456.675 1.047 1.166ZM6.03 8.431C6.03 6.627 7.647 6.3 9.177 6.3v.57c.001.776.002 1.434-.396 2.133-.336.595-.87.961-1.465.961-.812 0-1.286-.619-1.286-1.533M.435 12.174c2.629 1.603 6.698 4.084 13.183.997.28-.116.475.078.199.431C13.538 13.96 11.312 16 7.57 16 3.832 16 .968 13.446.094 12.386c-.24-.275.036-.4.199-.299z" />
      <path d="M13.828 11.943c.567-.07 1.468-.027 1.645.204.135.176-.004.966-.233 1.533-.23.563-.572.961-.762 1.115s-.333.094-.23-.137c.105-.23.684-1.663.455-1.963-.213-.278-1.177-.177-1.625-.13l-.09.009q-.142.013-.233.024c-.193.021-.245.027-.274-.032-.074-.209.779-.556 1.347-.623" />
    </svg>
  );
}

// ─── Track Slide ──────────────────────────────────────────────────────────
interface TrackSlideProps {
  track: Track;
  isSelected: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

function TrackSlide({ track, isSelected, isExpanded, onToggleExpand }: TrackSlideProps) {
  const num = String(track.id).padStart(2, "0");
  const noteRef = useRef<HTMLQuoteElement>(null);
  const [isClamped, setIsClamped] = useState(false);

  useEffect(() => {
    if (isExpanded) return;
    const el = noteRef.current;
    if (!el) return;
    setIsClamped(el.scrollHeight > el.clientHeight);
  }, [isExpanded]);

  const isAlbumCover = track.image === albumCover;

  return (
    <div
      className={`flex-none w-[72vw] sm:w-[290px] lg:w-[320px] mr-3 lg:mr-5 transition-opacity duration-[400ms] flex flex-col ${isSelected ? "opacity-100" : "opacity-40"}`}
    >
      <div className="border border-black/10 bg-white group flex-1 flex flex-col">
        {/* Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "1/1" }}>
          <img
            src={track.image}
            alt={track.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.03]"
          />

          {/* Track number ghost overlay */}
          <div
            className="absolute bottom-0 right-0 pointer-events-none select-none p-1"
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "4rem",
              fontWeight: 900,
              lineHeight: 1,
              color: "transparent",
              WebkitTextStroke: isAlbumCover
                ? "1px rgba(0,0,0,0.3)"
                : "1px rgba(255,255,255,0.22)",
              letterSpacing: "0.04em",
            }}
            aria-hidden="true"
          >
            {num}
          </div>

          {/* Hover overlay: ver video */}
          {track.youtubeUrl ? (
            <a
              href={track.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center"
              aria-label={`Ver video de ${track.title}`}
            >
              <span
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 border border-white text-white text-base tracking-widest uppercase px-4 py-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
              >
                Ver Video
              </span>
            </a>
          ) : (
            <div className="absolute inset-0" />
          )}
        </div>

        {/* Info block */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Number + bonus tag */}
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-black/15"
              style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "2rem",
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: "0.04em",
              }}
            >
              {num}
            </span>
            {track.bonus && (
              <span
                className="text-[#3d3d3d] text-base tracking-[0.2em] uppercase border border-black/20 px-2 py-0.5"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
              >
                Bonus
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            className="text-black leading-none mb-1"
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "clamp(1.1rem, 2.2vw, 1.35rem)",
              fontWeight: 800,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {track.title}
          </h3>

          {/* Feature */}
          {track.ft && (
            <p
              className="text-[#3d3d3d] text-base tracking-[0.15em] uppercase mb-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
            >
              ft. {track.ft}
            </p>
          )}

          {/* Divider */}
          <div className="h-px bg-black/8 my-3" />

          {/* Artist note */}
          <blockquote
            ref={noteRef}
            className={`text-[#3d3d3d]${!isExpanded ? " line-clamp-2" : ""}`}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontStyle: "italic",
              fontSize: "1rem",
              lineHeight: 1.65,
            }}
          >
            "{track.note}"
          </blockquote>

          {isClamped && (
            <button
              type="button"
              onClick={onToggleExpand}
              className="mt-1.5 text-sm text-black/40 hover:text-black transition-colors tracking-wide"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
            >
              {isExpanded ? "Ver menos" : "Ver más"}
            </button>
          )}

          {/* Platform links */}
          <div className="mt-auto pt-3">
            <div className="h-px bg-black/8 mb-3" />
            <div className="flex items-center justify-between">
              <span
                className="text-base tracking-[0.2em] uppercase text-[#3d3d3d]"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
              >
                Escuchar
              </span>
              <div className="flex items-center gap-3">
                {track.spotifyUrl && (
                  <a href={track.spotifyUrl} target="_blank" rel="noopener noreferrer" className="text-[#3d3d3d] hover:text-black transition-colors" aria-label="Escuchar en Spotify">
                    <SpotifyIcon size={16} />
                  </a>
                )}
                {track.appleMusicUrl && (
                  <a href={track.appleMusicUrl} target="_blank" rel="noopener noreferrer" className="text-[#3d3d3d] hover:text-black transition-colors" aria-label="Escuchar en Apple Music">
                    <AppleMusicIcon size={16} />
                  </a>
                )}
                {track.youtubeMusicUrl && (
                  <a href={track.youtubeMusicUrl} target="_blank" rel="noopener noreferrer" className="text-[#3d3d3d] hover:text-black transition-colors" aria-label="Escuchar en YouTube Music">
                    <YoutubeMusicIcon size={16} />
                  </a>
                )}
                {track.amazonMusicUrl && (
                  <a href={track.amazonMusicUrl} target="_blank" rel="noopener noreferrer" className="text-[#3d3d3d] hover:text-black transition-colors" aria-label="Escuchar en Amazon Music">
                    <AmazonMusicIcon size={16} />
                  </a>
                )}
                {track.deezerUrl && (
                  <a href={track.deezerUrl} target="_blank" rel="noopener noreferrer" className="text-[#3d3d3d] hover:text-black transition-colors" aria-label="Escuchar en Deezer">
                    <DeezerIcon size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────
export function TrackByTrack() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [expandedTrackId, setExpandedTrackId] = useState<number | null>(null);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setExpandedTrackId(null);
    };

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section
      id="tracks"
      className="bg-white py-12 lg:py-20 overflow-hidden"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-6">
        <SectionHeader label="Track by Track" title="Explora el album" />
        <p
          className="text-[#3d3d3d] text-base"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {TRACKS.length} canciones · Desliza para explorar
        </p>
      </div>

      {/* Progress bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-5">
        <div className="h-px bg-black/8 relative">
          <div
            className="absolute top-0 left-0 h-full bg-black transition-all duration-300"
            style={{ width: `${((selectedIndex + 1) / TRACKS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Embla carousel */}
      <div className="pl-6 lg:pl-10">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex items-stretch">
            {TRACKS.map((track) => (
              <TrackSlide
                key={track.id}
                track={track}
                isSelected={selectedIndex === track.id - 1}
                isExpanded={expandedTrackId === track.id}
                onToggleExpand={() =>
                  setExpandedTrackId((prev) => (prev === track.id ? null : track.id))
                }
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 mt-7 flex items-center justify-center">
        {/* Playlist link */}
        <a
          href={PLAYLIST_BASE}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-6 lg:left-10 flex items-center gap-1.5 text-[#3d3d3d] hover:text-black transition-colors text-base tracking-widest uppercase"
          style={{ fontWeight: 500 }}
        >
          Ver playlist
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
          </svg>
        </a>

        {/* Centered: arrows + counter */}
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={scrollPrev}
            className="w-9 h-9 border border-black/20 flex items-center justify-center hover:border-black hover:bg-black hover:text-white transition-all"
            aria-label="Cancion anterior"
          >
            <ArrowLeft size={13} />
          </button>

          <div className="flex items-center gap-1.5 min-w-[4rem] justify-center">
            <span
              className="text-black tabular-nums"
              style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.08em" }}
            >
              {String(selectedIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-black/20 text-xs">/</span>
            <span
              className="text-black/30 tabular-nums"
              style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.08em" }}
            >
              {String(TRACKS.length).padStart(2, "0")}
            </span>
          </div>

          <button
            type="button"
            onClick={scrollNext}
            className="w-9 h-9 border border-black/20 flex items-center justify-center hover:border-black hover:bg-black hover:text-white transition-all"
            aria-label="Siguiente cancion"
          >
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </section>
  );
}
