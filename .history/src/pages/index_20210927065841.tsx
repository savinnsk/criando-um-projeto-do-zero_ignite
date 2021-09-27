import { GetStaticProps } from 'next';
import { getPrismicClient } from '../services/prismic';
import Prismic from '@prismicio/client'

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

 export default function Home({homeProps } ) {
        return (

          <div className={styles.Container}>

                 <section  className={styles.postContent}>

                   <a href="">{homeProps.data.title} </a>



                  </section>
          </div>
     
          
        )
 }

 export const getStaticProps : GetStaticProps = async () => {
      const prismic = getPrismicClient();
      const postsResponse = await prismic.query([

        Prismic.predicates.at('document.type' , 'posts')
      ],{

        fetch: ['posts.title' , 'posts.subtitle' , 'post.author'],
        pageSize:1
      }
        
      );

      console.log(JSON.stringify(postsResponse , null , 2));

      return{
        props : {}
      }

};
