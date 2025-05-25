'use client';

export const dynamic = 'force-static'

import '@root/global.scss';

import * as Utilities from '@common/utilities';

import Accordion, { AccordionContext } from '@components/Accordion';
import ActionListItem from '@components/ActionListItem';
import Avatar from '@components/Avatar';
import Button from '@components/Button';
import Card from '@components/Card';
import Grid from '@components/Grid';
import ListItem from '@components/ListItem';
import Row from '@components/Row';
import Text from '@components/Text';
import DefaultLayout from '@components/page/DefaultLayout';

import { useEffect, useState, useRef, use } from 'react';
import ButtonStack from '@root/components/custom/ButtonStack';
import CodeBlock from '@root/components/CodeBlock';

//cv link 
const cv_link = "https://www.dropbox.com/scl/fi/twqhfmvko3bfpqoz6j3zl/FabianSchuller_CV_rev1.pdf?rlkey=ijsu5vnqchbpkpf6kbsd3fbqr&dl=1";

const ProjectCard = ({ title, children, githubLink = null, demoLink = null }: any) => (
  <div style={{ textAlign: 'justify', marginTop: '1ch' }}>
    <Card>
      {children}
      <br></br>
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


function closeAllAccordions() {
  const accordions = document.querySelectorAll('[aria-expanded="true"]');
      accordions.forEach((accordion) => {
        (accordion as HTMLElement).click();
      });
}

//Utilities.onHandleThemeChange('')
//Utilities.onHandleThemeChange('theme-dark')

export default function Portfolio() {
  const [openAccordions, setOpenAccordions] = useState<number>(0);

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

    const countAccordions = () => {
      const accordions = document.querySelectorAll('[aria-expanded="true"]');
      setOpenAccordions(accordions.length);
    };

    window.addEventListener('click', countAccordions);

    const handleScroll = () => {
      const closeButton = document.getElementById('close-all-button');
      if (closeButton) {
        closeButton.style.top = `${window.scrollY + 20}px`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('click', countAccordions);
      darkModeMediaQuery.removeEventListener('change', themeChangeHandler);
      window.removeEventListener('scroll', handleScroll)
    };
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
          <Avatar src="./1710766869672_black.jpeg" href='mailto:fbn.schllr@gmail.com' />
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
      {openAccordions >= 2 && (
        <Button
          id="close-all-button"
          theme={"SECONDARY"}
          onClick={closeAllAccordions}
          style={{
            marginTop: '1ch',
            position: 'absolute',
            top: '20px',
            right: '20px',
            fontSize: '0.8em',
            padding: '0.5em 1em',
            zIndex: 1000,
            width: 'fit-content',
          }}
        >
          Close All
        </Button>
      )}
      <ul>
        <Accordion title="SQLite Clone">
          <ProjectCard
            title="SQLite Clone"
            githubLink="https://github.com/fabsch225/rustql"
          >
            During a Course on Databases, I got interested in the "internals" of
            relational Databases, like Query-Planning and
            Transaction-Management. Therefore I started implementing a
            rudimentary SQLite-Clone in Rust. The Database supports CRUD queries
            and transactions, indices, views and permanent storage on disk. The architecture is strongly inspired by SQLite, for example
            the Database is stored in a single file, and the Schema is stored in a System-Table. <br />
            Components:
            <br />
            <CodeBlock>
              {`IO in/out
Parser -> Planner -> Executor
B-Tree
PagerFrontend <-> PagerAccessor <-> PagerCore
File on Disk`}
            </CodeBlock>
            <br />
            The project is still in development and can be found on GitHub.
          </ProjectCard>
        </Accordion>
        <Accordion title="3D Graphics Engine">
          <ProjectCard
            title="3D Graphics Engine"
            githubLink="https://github.com/fabsch225/rust3d"
            demoLink="#"
          >
            This is a CPU-based Graphics Engine in memory-safe Rust. It supports
            both rasterization and raymarching. It is programmed in a modular
            way and is object oriented. One can load 3D models from .obj files
            and apply textures to them. Both multithreaded rendering and
            rendering at a fixed framerate is supported. The Engine can be
            compiled to WebAssembly and run in the browser. The project is still
            in development and can be found on GitHub.
          </ProjectCard>
        </Accordion>

        <Accordion title="Unity: Visualizing Architectural Plans">
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
        </Accordion>

        <Accordion title="Javascript Visualizer">
          <ProjectCard
            title="Javascript Visualizer"
            demoLink="https://fabsch225.github.io/Nassi-Shneiderman-Compiler/"
            CarouselKey="js-nsd"
          >
            This is a tool which takes in JS, and then creates a Nassi
            Shneiderman Diagram based on the Source-Code. The functionality is
            limited to basic syntax, for example object-oriented js is not
            supported. The tool is best used for visualizing computer-science
            algorithms.
          </ProjectCard>
        </Accordion>



        <Accordion title="Leela Chess 0 Microservice">
          <ProjectCard
            title="LeelaDocker"
            githubLink="https://github.com/fabsch225/ldocker"
            CarouselKey="lc0-docker"
          >
            This is a Docker Image, which runs Google's Lc0 Chess Engine. It
            exposes a Websocket to access the Chess-Engine using the Universal Chess Interface. A Loadbalancer is
            not included. A Nvidia GPU with PCI Passthrough is required to run the Docker Image. WSL2 works also.
          </ProjectCard>
        </Accordion>



        <Accordion title="Oauth Client from Scratch">
          <ProjectCard
            title="Oauth Client"
            githubLink="https://github.com/fabsch225/OAuth-Client-in-GO"
            CarouselKey="oauth"
          >
            This is a simple Oauth Client in Go. This was a demonstration for an accompanying
            seminar presentation on the OAuth2.0 Protocol. There is an example setup using a local Authentik instance
            and a note-taking app, which uses the Oauth Client to authenticate users.
          </ProjectCard>
        </Accordion>


        <Accordion title="Advent of Code">
          <ProjectCard
            title="Advent of Code"
            CarouselKey="aoc"
          >
            <p>
              The <a href="https://adventofcode.com/">Advent of Code</a> is an annual event where participants solve programming puzzles.
              So far, i have participated in the years 2023 and 2024.
            </p>
          </ProjectCard>
        </Accordion>


        <Accordion title="Advent of Code 2023" tabbed={true}>
          <ProjectCard
            title="Advent of Code 2023: Trying new Languages"
            CarouselKey="aoc2023"
          >
            In 2023, i participated in the <a href="https://adventofcode.com/2023">Advent of Code</a>.
            The goal was to use a different language for each day, to learn new languages and paradigms.
            This prooved too time consuming, and i only made it to Day 10.
          </ProjectCard>
        </Accordion>


        <Accordion title="Advent of Code 2024 in C++" tabbed={true}>
          <ProjectCard
            title="Advent of Code 2024 C++"
            githubLink="https://github.com/fabsch225/AOC24"
            CarouselKey="aoc2024"
          >
            This is my complete solution to the <a href="https://adventofcode.com/2024">Advent of Code 2024</a> in C++.
            The code is written in a functional style, using the STL and some custom algorithms.
            In this semester i took a course on C++ in University. This was valuable practise for the practical exam, which i passed with a perfect score.
          </ProjectCard>
        </Accordion>


        <Accordion title="Video Games">
          <ProjectCard
            title="Video Games"
            CarouselKey="video-games"
          >
            Mainly in Secondary School, i developed some Video Games. Some of them are presented here.
          </ProjectCard>
        </Accordion>


        <Accordion title="Overnight Odyssey" tabbed={true}>
          <ProjectCard
            title="Overnight Odyssey"
            githubLink="https://github.com/fabsch225/ds2d"
            demoLink="https://fabsch225.itch.io/overnight-odyssey"
            CarouselKey="video-games-ds2d"
          >
            <p>Overnight Odyssey is a 2D adventure game inspired by Dark Souls. The
              player fights various monsters and can customize their character.
              The Game can be finished in 3-4 hours (therefore the name), but is
              rather difficult. It runs on Windows, Linux and Mac, as well as in
              the browser.</p><br />

            <iframe frameBorder="0" src="https://itch.io/embed/1429619" width="552" height="167"><a href="https://fabsch225.itch.io/overnight-odyssey">Overnight Odyssey by fabsch225</a></iframe>
          </ProjectCard>
        </Accordion>


        <Accordion title="Project Extinction" tabbed={true}>
          <ProjectCard
            title="Project Extinction"
            githubLink="https://github.com/fabsch225/Godot_Doom"
            CarouselKey="video-games-doom"
          >
            This is a doom-clone, set in a zombie apocalypse. It can be finished
            in an hour.
          </ProjectCard>
        </Accordion>


        <Accordion title="HNoir" tabbed={true}>
          <ProjectCard
            title="HNoir"
            githubLink="https://github.com/fabsch225/HotlineNoir"
            CarouselKey="video-games-hnoir"
          >
            This is a Topdown-Shooter / Detective Game inspired by Hotline Miami.
          </ProjectCard>
        </Accordion>

        <Accordion title="Others" tabbed={true}>
          <ProjectCard
            title="Others"
            CarouselKey="video-games-others"
          >
            <p>Other (earlier) Games include Clones of</p>
            <ul>
              <li>Asteroids</li>
              <li>Space Invaders</li>
              <li>Flappy Bird</li>
              <li>2048</li>
              <li>Pacman</li>
              <li><a href="https://play.google.com/store/apps/details?id=com.ChillyRoom.DungeonShooter&hl=en">Soul Knight</a></li>
              <li>Geometry Dash</li>
            </ul>
            <p>I used technology like Pygame, p5.js, p5 (java) and the Godot game engine</p>
          </ProjectCard>
        </Accordion>

      </ul>
    </DefaultLayout>
  );
}