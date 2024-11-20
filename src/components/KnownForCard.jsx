import React from "react"

import { FaStar } from "react-icons/fa"

const KnownForCard = ({knownFor}) => {

    if(!knownFor) return null

    const {title, original_title, name, vote_average} = knownFor

    const displayTitle = title || original_title || name

    if(!displayTitle || !vote_average) return null

    return (
        <div className="card_known_for_title">
            {displayTitle}
            <span>
                {vote_average} <FaStar/>
            </span>
        </div>
    )
}

export default KnownForCard