import React, { useState } from 'react'

const ConnectionExploreTab = ({ color }) => {

    const [openTab, setOpenTab] = useState(1)

    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full">
                    <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row" role="tablist">
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a
                                className={
                                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                    (openTab === 1
                                        ? "text-white bg-" + color + "-600"
                                        : "text-" + color + "-600 bg-white")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(1);
                                }}
                                data-toggle="tab"
                                href="#link1"
                                role="tablist"
                            >
                                {/* <i className="fas fa-space-shuttle text-base mr-1"></i>  */}
                                Connections
                            </a>
                        </li>
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a
                                className={
                                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                    (openTab === 2
                                        ? "text-white bg-" + color + "-600"
                                        : "text-" + color + "-600 bg-white")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(2);
                                }}
                                data-toggle="tab"
                                href="#link2"
                                role="tablist"
                            >
                                {/* <i className="fas fa-cog text-base mr-1"></i>   */}
                                Explore
                            </a>
                        </li>
                    </ul>
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
                        <div className="px-4 py-5 flex-auto">
                            <div className="tab-content tab-space">
                                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                    <p>
                                        Collaboratively administrate empowered markets via
                                        plug-and-play networks. Dynamically procrastinate B2C users
                                        after installed base benefits.
                                        <br />
                                        <br /> Dramatically visualize customer directed convergence
                                        without revolutionary ROI.
                                    </p>
                                </div>
                                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                    <p>
                                        Completely synergize resource taxing relationships via
                                        premier niche markets. Professionally cultivate one-to-one
                                        customer service with robust ideas.
                                        <br />
                                        <br />
                                        Dynamically innovate resource-leveling customer service for
                                        state of the art customer service.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConnectionExploreTab