import React from 'react';
import { Star } from 'lucide-react';
import { Review } from '../types/Product';

interface ReviewSectionProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews, averageRating, totalReviews }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-playfair font-semibold text-foreground">
          Customer Reviews ({totalReviews})
        </h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(averageRating)
                    ? "text-yellow-500 fill-current"
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="font-semibold text-foreground">
            {averageRating.toFixed(1)} out of 5
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-border pb-6">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">
                      {review.name}
                    </span>
                    {review.verified && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-yellow-500 fill-current"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {review.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed ml-13">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;