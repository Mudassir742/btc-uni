import React from 'react';

interface StarRatingProps {
  rating: number; // The rating (e.g., 3.5)
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= fullStars; i++) {
      stars.push(<span key={i} className="star">&#9733;</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="star">&#9734;&#9733;</span>);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star">&#9734;</span>);
    }

    return stars;
  };

  return (
    <div className="flex items-center">
      {renderStars()}
    </div>
  );
};

export default StarRating;
