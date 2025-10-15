import { useEffect, useState } from "react";
import { getAccount } from "../../../services/PostService";
import type { PostTypes } from "../../../types/PostTypes";
import CardPost from "./CardPost";

export default function Post() {
  const [multiplePost, sedMultiplePost] = useState<PostTypes[]>([]); // la tag va el tipado
  useEffect(() => {
    const fecthData = async () => {
      const data = await getAccount(); // aqui va la funcion de services 
      sedMultiplePost(data);
    };
    fecthData();
  }, []);

  return (



    <div>
      {
        multiplePost.map((cardIndividual: PostTypes) => {
          return <CardPost key={cardIndividual.id} cardIndividuals={cardIndividual} />;
          //cardIndividuals es el mism nombre que se le pone en CardPost
        })
      }
    </div>


  );
};

