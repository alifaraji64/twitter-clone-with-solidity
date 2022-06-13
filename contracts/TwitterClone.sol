pragma solidity >=0.6.0;
contract TwitterClone{

  string public name = 'twitter_clone';
  mapping(uint=>Tweet) public tweets;
  uint16 public tweetCount = 0;

  struct likedAddresses{
    address likedAdress;
  }
  mapping(uint16=>likedAddresses[]) public likes; //change the modifier later

  struct Tweet{
    uint16 id;
    address payable author;
    string content;
    string date;
  }
  event tweetCreated(
    uint16 id,
    address payable author,
    string content,
    string date
  );

  function addTweet(string memory _content, string memory _date) public {
    require(bytes(_content).length>0, 'content is empty');
    require(bytes(_date).length>0, 'date is empty');
    tweets[tweetCount] = Tweet(tweetCount, payable(msg.sender), _content, _date);
    emit tweetCreated(tweetCount, payable(msg.sender), _content, _date);
    tweetCount++;
  }

  function addLike(uint16 _tweetId) public {
    require(_tweetId>=0, 'tweetId cannot be empty');
    likes[_tweetId].push(likedAddresses(msg.sender));
  }

  function getLikes(uint16 _tweetId) public view returns(likedAddresses[] memory){
        return likes[_tweetId];
    }
}
