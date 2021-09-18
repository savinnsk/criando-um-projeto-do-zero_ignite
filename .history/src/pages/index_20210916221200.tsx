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

 export default function Home() {
        return (

          <div className={styles.Container}>

                 <section  className={styles.postContent}>



                  </section>
          </div>
     
          
        )
 }

 export const getStaticProps : GetStaticProps = async () => {
      const prismic = getPrismicClient();
      const postsResponse = await prismic.query([

        Prismic.predicates.at('document.type' , 'posts')
      ],{

        fetch: ['posts.title' , 'posts.content'],
        pageSize:1
      }
        
      );

      console.log(postsResponse);

      return{
        props : {}
      }

};