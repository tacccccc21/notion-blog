import Footer from '@/components/Footer/Footer';
import SinglePost from '@/components/Post/SinglePost';
import Tag from '@/components/Tag/Tag';
import { getAllPosts, getAllTags, getPagePostsForTopPage } from '@/lib/notionAPI'
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { endianness } from 'os';
import { number } from 'prop-types';
import { useEffect } from 'react';
import { start } from 'repl';
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export const getStaticProps: GetStaticProps = async () =>{
  const fourPosts = await getPagePostsForTopPage(4);
  const allTags = await getAllTags();

  return{
    props:{
      fourPosts,
      allTags,
    },
    revalidate: 60,
  }
}

export default function Home({ fourPosts ,allTags}: any) {
  let canvas: HTMLCanvasElement;
  let model: THREE.Group;
  // let lastScrollY = 0;
  useEffect(() => {
  canvas = document.getElementById('canvas') as HTMLCanvasElement;

    const sizes = {
      width: innerWidth,
      height: innerHeight,
    }

 

  // scene
  const scene: THREE.Scene = new THREE.Scene()

  // camera
  const camera:THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
    75, 
    sizes.width / sizes.height,
    0.1,
    1000,
    )
    camera.position.set(0,0,1.5);

  // renderer
  const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
  })
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(window.devicePixelRatio);

  // ライトの作成
  const light:THREE.DirectionalLight = new THREE.DirectionalLight(0xefefef, 2)
  light.position.set(1, 5, 5).normalize()
  scene.add(light)

  // 3dmodel import
  const gftfLoader: GLTFLoader = new GLTFLoader();
  gftfLoader.load("models/rotom/scene.gltf", (gltf) =>  {
  model = gltf.scene;
  // model.position.set(0,0,0)
  scene.add(model)
  })

   // スクロール量
  let lastScrollTop = 0;

  




  // スクロールアニメーション
  const animationScripts: any[] = []

  animationScripts.push({
    start: 0,
    end: 40,
    handleScroll() {
  const scrollTop = window.scrollY;
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  // const scrollPercentage = scrollTop / totalHeight;
  const maxScrollForRotation = totalHeight * 0.7; // 70% of the total scrollable height
  const scrollPercentage = Math.min(scrollTop / maxScrollForRotation, 1);

  // Y軸に基づいて、0から180度までの回転を計算
  const targetRotationY = scrollPercentage * 225;
  const targetRotationZ = scrollPercentage * 90;   // Z軸での回転: 0から90度

    // 70% to 100%: For moving the model
  const scrollPercentageForMovement = (scrollTop - maxScrollForRotation) / (totalHeight - maxScrollForRotation);
  const targetPositionZ = scrollPercentageForMovement * -0.3;  // e.g., Move model 2 units back, adjust as needed
  const targetPositionX = scrollPercentageForMovement * 0.3;   // e.g., Move model 2 units right, adjust as needed
  const targetPositionY = scrollPercentageForMovement * 0.3;   // e.g., Move model 2 units up, adjust as needed

  if (model) {
    model.rotation.y = THREE.MathUtils.degToRad(targetRotationY);
    model.rotation.z = THREE.MathUtils.degToRad(targetRotationZ);
    if (scrollTop > maxScrollForRotation) {
      model.position.z += targetPositionZ;
      model.position.x += targetPositionX;
      model.position.y += targetPositionY;
      if (model) {
        // Set the model's position based on the calculated target positions
        model.position.set(targetPositionX, targetPositionY, targetPositionZ);
      }
    }
  }

  lastScrollTop = scrollTop;
  }
  })
  
  // animationを開始
  const playScrollAnimation = () =>{
    animationScripts.forEach((anim) => {
      anim.handleScroll();
    })
  }


  const tick = () =>{
    renderer.render(scene, camera);
    playScrollAnimation()
    requestAnimationFrame(tick);
  };
  tick();

  },[])


  return (
    <>
      <canvas id='canvas' className='bg-white w-auto fixed top-0 left-0 -z-10'></canvas>
      <div className='h-screen w-screen'></div>
      <div className='container h-full w-full mx-auto font-mono pt-16'>
        <main className='container w-full pt-16'>
          <h1 className='text-5xl font-medium text-center mb-16'>T-Music</h1>
            {fourPosts.map((post: any) =>
            <div className='mx-4' key={post.title}>
            <SinglePost 
            title = {post.title}
            description = {post.description}
            date = {post.date}
            tags = { post.tags }
            slug = {post.slug}
            isPagenationPage={false}
            
            ></SinglePost>
                  </div>
            )}
          <Link href="/posts/page/1" className='mb-6 lg:w-1/2 mx-auto rounded-sm px-5 block text-right'>More</Link>
          <Tag tags={allTags}></Tag>
        </main>
      </div>
    </>
  )
}
