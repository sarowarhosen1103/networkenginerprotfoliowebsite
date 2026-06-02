"use client";

import React, { useEffect, useState } from 'react';
import { 
    IoLogoHtml5, IoLogoCss3, IoLogoJavascript, IoLogoNodejs, 
    IoLogoFigma, IoLogoFirebase, IoLogoPython, IoLogoReact, 
    IoLogoSass, IoLogoWordpress, IoLogoTux, IoPrism 
} from 'react-icons/io5';
import { useSelector } from 'react-redux';

// 1. Define unique skills with names for a better UI look
const uniqueSkills = [
    { name: "HTML5", icon: <IoLogoHtml5 /> },
    { name: "CSS3", icon: <IoLogoCss3 /> },
    { name: "JavaScript", icon: <IoLogoJavascript /> },
    { name: "Node.js", icon: <IoLogoNodejs /> },
    { name: "Figma", icon: <IoLogoFigma /> },
    { name: "Firebase", icon: <IoLogoFirebase /> },
    { name: "Python", icon: <IoLogoPython /> },
    { name: "React", icon: <IoLogoReact /> },
    { name: "Sass", icon: <IoLogoSass /> },
    { name: "WordPress", icon: <IoLogoWordpress /> },
    { name: "Linux", icon: <IoLogoTux /> },
    { name: "Prisma", icon: <IoPrism /> },
];

// 2. Duplicate them 4 times to ensure it covers very wide ultra-wide screens
// and allows the -50% CSS translation to loop completely seamlessly.
const SkillIcon = [...uniqueSkills, ...uniqueSkills, ...uniqueSkills, ...uniqueSkills];

export default function LeftRightSkillAnimation() {
    const [isScrollingDown, setIsScrollingDown] = useState(true);
    const { textColor } = useSelector((state: any) => state.themeColor) || { textColor: '' };

    useEffect(() => {
        let lastScrollTop = 0;
        
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop) {
                setIsScrollingDown(true);  // Scrolling down
            } else {
                setIsScrollingDown(false); // Scrolling up
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Helper function to render a looping marquee row
    const renderMarqueeRow = (animationClass: string) => (
        // overflow-hidden on the parent is CRITICAL so it doesn't cause a horizontal scrollbar on the page
        <div className="relative overflow-hidden w-full flex group mask-edges">
            {/* w-max is CRITICAL so the flex items don't squeeze/wrap */}
            {/* group-hover:[animation-play-state:paused] pauses the animation nicely when the user hovers over it */}
            <div className={`flex gap-1 w-max ${animationClass} group-hover:[animation-play-state:paused]`}>
                {SkillIcon.map((skill, index) => (
                    <div
                        key={index}
                        className="w-[140px] h-[90px] bg-white/5 border border-white/10 flex flex-col items-center justify-center rounded backdrop-blur-md hover:border-primary-container hover:bg-white/10 hover:shadow-[0_0_15px_rgba(var(--color-primary-container-rgb),0.2)] transition-all duration-300 cursor-default"
                    >
                        <div className="text-primary-container text-4xl mb-2 transition-transform group-hover:scale-110">
                           {skill.icon}
                        </div>
                        <span className="text-[11px] font-label-mono text-on-surface-variant uppercase tracking-wider">
                            {skill.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <section className={`py-12 ${textColor}`}>
            <div className="w-full space-y-1">
                {/* Top Row - Slides Left by default, switches to Right when scrolling up */}
                {renderMarqueeRow(isScrollingDown ? 'animate-slide-left' : 'animate-slide-right')}
                
                {/* Bottom Row - Slides Right by default, switches to Left when scrolling up */}
                {renderMarqueeRow(isScrollingDown ? 'animate-slide-right' : 'animate-slide-left')}
            </div>
        </section>
    );
}
