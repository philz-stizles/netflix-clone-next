import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const movies = await prisma.movie.createMany({
    data: [
      {
        title: "Sintel",
        description:
          "A lonely young woman, Sintel, helps and befriends a dragon, whom she calls Scales. But when he is kidnapped by an adult dragon, Sintel decides to embark on a dangerous quest to find her lost friend Scales.",
        videoUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
        thumbnailUrl: "http://uhdtv.io/wp-content/uploads/2020/10/Sintel-3.jpg",
        genre: "Adventure",
        duration: "15 minutes",
      },
      {
        title: "Tears of Steel",
        description:
          "In an apocalyptic future, a group of soldiers and scientists takes refuge in Amsterdam to try to stop an army of robots that threatens the planet.",
        videoUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        thumbnailUrl:
          "https://mango.blender.org/wp-content/uploads/2013/05/01_thom_celia_bridge.jpg",
        genre: "Action",
        duration: "12 minutes",
      },
      {
        title: "Elephant's Dream",
        description:
          "Friends Proog and Emo journey inside the folds of a seemingly infinite Machine, exploring the dark and twisted complex of wires, gears, and cogs, until a moment of conflict negates all their assumptions.",
        videoUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        thumbnailUrl: "https://download.blender.org/ED/cover.jpg",
        genre: "Sci-Fi",
        duration: "15 minutes",
      },
    ],
  });

  console.log({ movies });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
