'use client';

export const dynamic = 'force-static'

import '@root/global.scss';

import * as Utilities from '@common/utilities';

import Accordion from '@components/Accordion';
import ActionListItem from '@components/ActionListItem';
import Avatar from '@components/Avatar';
import Button from '@components/Button';
import Card from '@components/Card';
import Grid from '@components/Grid';
import ListItem from '@components/ListItem';
import Row from '@components/Row';
import Text from '@components/Text';
import DefaultLayout from '@components/page/DefaultLayout';

import Carousel, { CarouselHandle } from '@components/custom/Carousel';
import { useEffect, useRef } from 'react';
import ButtonStack from '@root/components/custom/ButtonStack';

//cv link 
const cv_link = "https://www.dropbox.com/scl/fi/4an8ph14t0xsmdi0id2a3/cv-Fabian-Schuller.pdf?rlkey=1ccm13z8adnjol1vtzx8q9aou&st=4zivvvo4&dl=1";

const ProjectCard = ({ title, children, githubLink = null, demoLink = null } : any) => (
  <div style={{ textAlign: 'justify' }}>
  <Card title={title}>
    <p>{children}</p>
    {githubLink && <br />}
    {githubLink && (
      <Row>
      <ActionListItem icon={'->'} href={githubLink} target="_blank">
          View the Project on Github
      </ActionListItem>
      </Row>
    )}
    {demoLink && (
      <Row>
        <ActionListItem icon={'->'} href={demoLink} target="_blank">
          View a Demonstration in the Browser
        </ActionListItem>
        </Row>
    )}
  </Card>
  <br />
  </div>
);

//Utilities.onHandleThemeChange('')
//Utilities.onHandleThemeChange('theme-dark')

export default function Portfolio() {
  const carouselRef = useRef<CarouselHandle>(null);
  
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    if (darkModeMediaQuery.matches) {
      Utilities.onHandleThemeChange('theme-dark');
    } else {
      Utilities.onHandleThemeChange('');
    }
    const themeChangeHandler = (e: MediaQueryListEvent) => {
      Utilities.onHandleThemeChange(e.matches ? 'theme-dark' : '');
    };

    darkModeMediaQuery.addEventListener('change', themeChangeHandler);
    return () => {
      darkModeMediaQuery.removeEventListener('change', themeChangeHandler);
    };
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        carouselRef.current?.goto(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <DefaultLayout previewPixelSRC="null">
      <Grid>
        <Row>
          <h1>Fabian Alexander Schuller</h1>
          <Text>Student of Mathematics & Computer Science</Text>
        </Row>
        <Row>
          <br />
          <Avatar src="./1710766869672_black.jpeg" href='mailto:fbn.schllr@gmail.com'/>
        </Row>
        <Row>
        <ButtonStack>
            <Button onClick={() => window.open(cv_link)}>
              Download CV
            </Button>
            <Button onClick={() => window.open('https://github.com/fabsch225')}>
              GitHub
            </Button>
            <Button onClick={() => window.open('https://www.linkedin.com/in/fabian-schuller/')}>
              LinkedIn
            </Button>
          </ButtonStack>
        </Row>
      </Grid>
      <Grid>
      <Row>
      <h1>Personal Programming Projects</h1>
      <p> Below you find some Programming Projects, some of which i did in University, some in Grammar School. 
      </p>
      </Row>
      <Accordion defaultValue={false} title="INDEX">
          <br />
            <ol>
              <ListItem>
                <a href="#rust-3d">
                 3D Graphics Engine
                </a>
              </ListItem>
              <ListItem>
                <a href="#unity-vr">
                Unity: Visualizing Architectural Plans
                </a>
              </ListItem>
              <ListItem>
                <a href="#rustsql">
                SQLite Clone
                </a>
              </ListItem>
              <ListItem>
                <a href="#js-nsd">
                Javascript Visualizer
                </a>
              </ListItem>
              <ListItem>
                <a href="#lc0-docker">
                Leela Chess 0 Microservice
                </a>
              </ListItem>
              <ListItem>
                <a href="#oauth">
                Oauth Client from Scratch
                </a>
              </ListItem>
              <ListItem>  
                <a href="#video-games">
                  Video Games
                </a>
              </ListItem>
              <ol>
                <ListItem>
                  <a href="#video-games-ds2d">
                    Overnight Odyssey
                  </a>
                </ListItem>
                <ListItem>
                  <a href="#video-games-doom">
                    Project Extinction
                  </a>
                </ListItem>
                <ListItem>
                  <a href="#video-games-hnoir">
                    HNoir
                  </a>
                </ListItem>
              </ol>
            </ol>
          <br />
        </Accordion>
      </Grid>
      <Carousel ref={carouselRef} >
      <ProjectCard 
          title="SQLite Clone"
          githubLink="https://github.com/fabsch225/rustql"
          CarouselKey="rustsql"
        >
          During a Course on Databases, i got interested in the "internals" of
          relational Databases, like Query-Planning and
          Transaction-Management. Therefore i started implementing a
          rudimentary SQLite-Clone in Rust. The Database supports CRUD querys
          and transactions, indices, views and permanent storage on disk. The architecte is strongly inspired by SQLite.
        </ProjectCard>
      <ProjectCard 
          title="3D Graphics Engine"
          githubLink="https://github.com/fabsch225/rust3d"
          demoLink="#"
          CarouselKey="rust-3d"
        >
          This is a CPU-based Graphics Engine in memory-safe Rust. It supports
          both rasterization and raymarching. It is programmed in a modular
          way and is object oriented. One can load 3D models from .obj files
          and apply textures to them. Both multithreaded rendering and
          rendering at a fixed framerate is supported. The Engine can be
          compiled to WebAssembly and run in the browser. The project is still
          in development and can be found on GitHub.  
        </ProjectCard>

        <ProjectCard 
          title="Architecture in VR"
          CarouselKey="unity-vr"
        >
          The Goal of the Project is to visualize architectural plans in
          Virtual Reality. Instead of implementing an Api to "real"
          architectural software, the project uses an Web-Editor to create the
          plans. The Tech-Stack consists of Unity Engine and Nuxt. Nuxt both
          serves as the Web-Editor and the Backend. The Plans are loaded using
          a Rest-Api, and a Websocket is used to communicate updates to the
          Unity-Client, so changes are reflected in real-time. Some
          Gamification is implemented, for Example Procedurally Generated
          Labyrinths and Collectible Coins. The Project is meant as a Proof of
          Concept for VR / External Interaction and was developed with fellow
          Students for Uni.
        </ProjectCard>

        <ProjectCard 
          title="Javascript Visualizer"
          demoLink="#"
          CarouselKey="js-nsd"
        >
          This is a tool which takes in JS, and then creates a Nassi
          Shneiderman Diagram based on the Source-Code. The functionality is
          limited to basic syntax, for example object-oriented js is not
          supported. The tool is best used for visualizing computer-science
          algorithms.
        </ProjectCard>

        <ProjectCard 
          title="LeelaDocker"
          githubLink="https://github.com/fabsch225/ldocker"
          CarouselKey="lc0-docker"
        >
          This is a Docker Image, which runs Google's Lc0 Chess Engine. It
          exposes a Websocket to access the Chess-Engine using the Universal Chess Interface. A Loadbalancer is
          not included.
        </ProjectCard>

        <ProjectCard 
          title="Oauth Client"
          githubLink="https://github.com/fabsch225/OAuth-Client-in-GO"
          CarouselKey="oauth"
        >
          This is a simple Oauth Client in Go. This was a demonstration for an accompanying
          seminar presentation on the OAuth2.0 Protocol. There is an example setup using a local Authentik instance 
          and a note-taking app, which uses the Oauth Client to authenticate users.
        </ProjectCard>
        <ProjectCard 
          title="Video Games"
          CarouselKey="video-games"
        >
          Mainly in Secondary School, i developed some Video Games. Some of them are presented here.
        </ProjectCard>
        <ProjectCard 
          title="Overnight Odyssey"
          githubLink="https://github.com/fabsch225/ds2d"
          demoLink="https://fabsch225.itch.io/overnight-odyssey"
          CarouselKey="video-games-ds2d"
        >
          Overnight Odyssey is a 2D adventure game inspired by Dark Souls. The
          player fights various monsters and can customize their character.
          The Game can be finished in 3-4 hours (therefore the name), but is
          rather difficult. It runs on Windows, Linux and Mac, as well as in
          the browser.
        </ProjectCard>
        <ProjectCard 
          title="Project Extinction"
          githubLink="https://github.com/fabsch225/Godot_Doom"
          CarouselKey="video-games-doom"
        >
          This is a doom-clone, set in a zombie apocalypse. It can be finished
          in an hour.
        </ProjectCard>
        <ProjectCard 
          title="HNoir"
          githubLink="https://github.com/fabsch225/HotlineNoir"
          CarouselKey="video-games-hnoir"
        >
          This is a Topdown-Shooter / Detective Game inspired by Hotline Miami.
        </ProjectCard>
      </Carousel>
    </DefaultLayout>
  );
}