const TwitterClone = artifacts.require("TwitterClone");

contract("TwitterClone", function (accounts){
  let twitterClone;
  before(async()=>{
    try {
      twitterClone = await TwitterClone.deployed();
    } catch (e) {
      console.log(e);
    }
  })
  it('getting tweetCount', async()=>{
    const tweetCount = await twitterClone.tweetCount();
    assert.equal(tweetCount.toNumber(),0);
  })
  it('addTweet function works',async()=>{
    await twitterClone.addTweet('my first tweet',(new Date()).getTime().toString());
    const tweetCount = await twitterClone.tweetCount();
    //check if tweetCount has been incremented by one
    assert.equal(tweetCount.toNumber(),1);
    //get the first item in tweets mapping and check if the content property is what we added
    const tweets = await twitterClone.tweets(0);
    assert.equal(tweets.content,'my first tweet');
  })

  it('addTweet function gives error without credentials', async()=>{

    try {
      await twitterClone.addTweet('',(new Date()).getTime());
    } catch (e) {
      assert.equal(e.reason, 'content is empty')
    }

    try {
      await twitterClone.addTweet('first tweet','');
    } catch (e) {
      assert.equal(e.reason, 'date is empty')
    }

  })

  it('addLike function works', async()=>{
    await twitterClone.addTweet('my first tweet',(new Date()).getTime().toString());
    await twitterClone.addLike(0);
    await twitterClone.addLike(0,{from:accounts[1]});
    const likes = await twitterClone.getLikes.call(0);
    //check if there is 2 likes for the tweet with 0 id
    assert.equal(likes.length,2);
    assert.equal(likes[0][0],accounts[0]);
    assert.equal(likes[1][0],accounts[1]);
  })
  it('addLike function gives error without credentials', async() => {
    try {
      await twitterClone.addLike('');
    } catch (e) {
     assert.equal(e.reason,'tweetId cannot be empty')
    }
  });

});
