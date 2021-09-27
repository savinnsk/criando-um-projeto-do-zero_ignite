import { GetStaticProps } from 'next';
import { getPrismicClient } from '../services/prismic';
import Prismic from '@prismicio/client'

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

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

                   <a href="">{homeProps} </a>



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


      const posts = postsResponse.results.map(post => {

        return {
             slug: post.uid,
             title : post.data.title[0].text,
             subtitle : post.data.subtitle[0].text,
             author : post.data.author[0].text,
             excerpt:post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
             updatedAt : format(new Date(post.last_publication_date),'',{ locale : ptBR,})

          }
        
      })

      console.log(JSON.stringify(postsResponse , null , 2));

      return{
        props : {posts}
      }

};
