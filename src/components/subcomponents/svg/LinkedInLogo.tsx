import React from 'react';
import {DarkModeContext} from "../../../common/contexts";

export default function LinkedInLogo() {
    return <>
        <DarkModeContext.Consumer>
            {isDarkMode => <>
                <svg role="img"
                     aria-label={"LinkedIn Logo - LinkedIn is an employment website and this is the logo for it."}
                     version="1.1"
                     id="linkedin-logo"
                     xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                     width="30px"
                     height="30px"
                     viewBox="0 0 438.536 438.535">
                    <title>LinkedIn Logo</title>
                    <desc>LinkedIn is an employment website and this is the logo for it.</desc>
                    <g fill={isDarkMode ? "#A0B6A5" : ""}>
                        <rect x="5.424" y="145.895" width="94.216" height="282.932"/>
                        <path d="M408.842,171.739c-19.791-21.604-45.967-32.408-78.512-32.408c-11.991,0-22.891,1.475-32.695,4.427
			c-9.801,2.95-18.079,7.089-24.838,12.419c-6.755,5.33-12.135,10.278-16.129,14.844c-3.798,4.337-7.512,9.389-11.136,15.104
			v-40.232h-93.935l0.288,13.706c0.193,9.139,0.288,37.307,0.288,84.508c0,47.205-0.19,108.777-0.572,184.722h93.931V270.942
			c0-9.705,1.041-17.412,3.139-23.127c4-9.712,10.037-17.843,18.131-24.407c8.093-6.572,18.13-9.855,30.125-9.855
			c16.364,0,28.407,5.662,36.117,16.987c7.707,11.324,11.561,26.98,11.561,46.966V428.82h93.931V266.664
			C438.529,224.976,428.639,193.336,408.842,171.739z"/>
                        <path d="M53.103,9.708c-15.796,0-28.595,4.619-38.4,13.848C4.899,32.787,0,44.441,0,58.529c0,13.891,4.758,25.505,14.275,34.829
			c9.514,9.325,22.078,13.99,37.685,13.99h0.571c15.99,0,28.887-4.661,38.688-13.99c9.801-9.324,14.606-20.934,14.417-34.829
			c-0.19-14.087-5.047-25.742-14.561-34.973C81.562,14.323,68.9,9.708,53.103,9.708z"/>
                    </g>
                </svg>
            </>}
        </DarkModeContext.Consumer>
    </>;
}