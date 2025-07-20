// Auction service: business logic for auctions
import * as auctionApi from "../api/auctionApi";

export const getHighestBid = (bids) => {
  if (!bids || bids.length === 0) return null;
  return Math.max(...bids.map((bid) => bid.prix));
};

export const getBidCount = (bids) => (bids ? bids.length : 0);

export const getWinner = (bids) => {
  if (!bids || bids.length === 0) return null;
  // Assuming the highest bid is the winner (latest highest)
  const highest = bids.reduce(
    (max, bid) => (bid.prix > max.prix ? bid : max),
    bids[0]
  );
  return highest.client;
};

// Add more auction-related business logic as needed
