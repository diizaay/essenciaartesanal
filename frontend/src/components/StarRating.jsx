import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating, maxRating = 5, size = 20, interactive = false, onRatingChange }) => {
    const handleClick = (value) => {
        if (interactive && onRatingChange) {
            onRatingChange(value);
        }
    };

    return (
        <div className="flex items-center gap-1">
            {[...Array(maxRating)].map((_, index) => {
                const starValue = index + 1;
                const isFilled = starValue <= rating;

                return (
                    <button
                        key={index}
                        type="button"
                        onClick={() => handleClick(starValue)}
                        disabled={!interactive}
                        className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
                        aria-label={`${starValue} ${starValue === 1 ? 'estrela' : 'estrelas'}`}
                    >
                        <Star
                            size={size}
                            className={`${isFilled
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'fill-none text-gray-300'
                                } transition-colors`}
                        />
                    </button>
                );
            })}
        </div>
    );
};

export default StarRating;
