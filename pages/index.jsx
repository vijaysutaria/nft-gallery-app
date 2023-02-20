import { useState } from 'react';

const Home = () => {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([])
  const [fetchForCollection, setFetchForCollection] = useState(false)
  const API_KEY = '8wzMcQYb5NU3JIaQqu5BWfjwwlWDxRsc';

  const fetchNFTs = async () => {
    let nfts;
    console.log("fetching nfts");

    const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${API_KEY}/getNFTs/`;
    var requestOptions = {
      method: 'GET'
    };

    if (!collection.length) {

      const fetchURL = `${baseURL}?owner=${wallet}`;

      nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    } else {
      console.log("fetching nfts for collection owned by address")
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    }

    if (nfts) {
      console.log("nfts:", nfts)
      setNFTs(nfts.ownedNfts)
    }
  }

  const fetchNFTsForCollection = async () => {
    if (collection.length) {
      var requestOptions = {
        method: 'GET'
      };

      const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${API_KEY}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
      const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
      if (nfts) {
        console.log("NFTs in collection:", nfts)
        setNFTs(nfts.nfts)
      }
    }
  }
  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <input type={"text"} onChange={(e) => { setWalletAddress(e.target.value) }} value={wallet} placeholder="Add your wallet address"></input>
        <input type={"text"} onChange={(e) => { setCollectionAddress(e.target.value) }} placeholder="Add the collection address"></input>
        <label className="text-gray-600 ">
          <input type={"checkbox"} className="mr-2" onChange={(e) => { setFetchForCollection(e.target.checked) }}></input>Fetch for collection
        </label>
        <button className={"disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"} onClick={
          () => {
            if (fetchForCollection) {
              fetchNFTsForCollection()
            } else {
              fetchNFTs();
            }
          }
        }>Let's go! </button>
      </div>

      <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
        {
          NFTs.length && NFTs.map(nft => {
            return (
              <NFTCard nft={nft}></NFTCard>
            )
          })
        }
      </div>

    </div>
  )
}

export default Home
// https://eth-goerli.g.alchemy.com/v2/4Ox_hr94nJdlOVkyDOufHfTcdWVlQqzn