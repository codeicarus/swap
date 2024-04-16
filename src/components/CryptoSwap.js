import { HiArrowsUpDown } from "react-icons/hi2";
import SearchCrypto from "./SearchCrypto";
import { useState } from "react";
import { notification } from "antd";

import data from '../data/cryptos.json';

const CryptoSwap = () => {

    const [isOpenFirstToken, setIsOpenFirstToken] = useState(false);
    const [isOpenSecondToken, setIsOpenSecondToken] = useState(false);
    const [firstToken, setFirstToken] = useState(() => {
        const storedTokenName = new URLSearchParams(window.location.search).get('firstToken');
        const storedToken = data.filter((item)=>item.token.includes(storedTokenName))[0];
        return storedToken ? storedToken : {token: 'ETH', icon: "./cryptos/eth.svg", price: 70}
    });
    const [secondToken, setSecondToken] = useState(() => {
        const storedTokenName = new URLSearchParams(window.location.search).get('secondToken');
        const storedToken = data.filter((item)=>item.token.includes(storedTokenName))[0];
        return storedToken ? storedToken : {token: 'Select a token', icon: ""}
        
    });

    const [firstTokenValue, setFirstTokenValue] = useState(0);
    const [secondTokenValue, setSecondTokenValue] = useState(0);
    const onClose = () => {
        setIsOpenFirstToken(false);
        setIsOpenSecondToken(false);
    }

    const newUrl = `${window.location.origin}?firstToken=${firstToken.token}&secondToken=${secondToken.token}`
    window.history.replaceState({}, '', newUrl);

    const Swap = () => {
        notification.open({
            message: 'Swap Success',
            description: 'The swap was successful',
        })
    }

    const handleExchange =() => {
        setFirstToken(secondToken);
        setSecondToken(firstToken);
        setFirstTokenValue(secondTokenValue);
        setSecondTokenValue(firstTokenValue);
    }



    return (
        <div className="w-[480px] h-[325px] p-2 rounded-lg border border-blue-500 mx-auto mt-[250px]">
            <SearchCrypto
                open={isOpenFirstToken}
                onClose={onClose}
                setToken={({ token, icon, price }) => {
                    setFirstTokenValue(firstTokenValue * firstToken?.price / price);
                    setFirstToken({ token, icon, price });

                }}
            />
            <div className="w-full p-2 h-[120px] bg-gray-100 rounded-lg mb-2">
                <div className="text-gray-400 ml-2">You pay</div>
                <div className="flex justify-between mt-2 mx-2">
                    <input
                        placeholder="0"
                        type="number"
                        size={5}
                        className="w-[200px] text-[30px] bg-transparent focus:outline-none"
                        value={firstTokenValue}
                        style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
                        onChange={(e) => {
                            setFirstTokenValue(e.target.value);
                            setSecondTokenValue((e.target.value * firstToken?.price / secondToken?.price).toFixed(2))
                        }}
                    />
                    <div className="flex p-2 rounded-full bg-white font-medium text-[20px] hover: cursor-pointer hover:bg-gray-200" onClick={() => setIsOpenFirstToken(true)}>
                        <img src={firstToken?.icon} alt="" />
                        <div className="ml-2">{firstToken?.token}</div>
                    </div>
                </div>
            </div>
            <div className="fixed ml-[210px] -mt-5 bg-white rounded-md" onClick={handleExchange}>
                <div className="hover: cursor-pointer m-1 p-2 bg-grap-100 z-[999] rounded-md hover:bg-gray-200 text-[20px]">
                    <HiArrowsUpDown />
                </div>
            </div>
            <SearchCrypto
                open={isOpenSecondToken}
                onClose={onClose}
                setToken={({ token, icon, price }) => {
                    setSecondTokenValue(secondTokenValue * secondToken?.price / price);
                    setSecondToken({ token, icon, price });
                }}
            />
            <div className="w-full p-2 h-[120px] bg-gray-100 rounded-lg mb-2">
                <div className="text-gray-400 ml-2">You recieve</div>
                <div className="flex justify-between mt-2 mx-2">
                    <input
                        placeholder="0"
                        type="number"
                        size={5}
                        value={secondTokenValue}
                        className="w-[200px] text-[30px] bg-transparent focus:outline-none"
                        onChange={(e) => {
                            setSecondTokenValue(e.target.value);
                            setFirstTokenValue((e.target.value * secondToken?.price / firstToken?.price))
                        }}

                    />
                    <div className="flex p-2 rounded-full bg-white font-medium text-[20px] hover: cursor-pointer hover:bg-gray-200" onClick={() => setIsOpenSecondToken(true)}>
                        <img src={secondToken?.icon} alt="" />
                        <div className="ml-2">{secondToken?.token}</div>
                    </div>
                </div>
            </div>
            <button className="w-full h-[50px] bg-gray-500 rounded-lg font-medium text-[20px]" onClick={Swap}>Swap</button>
        </div>
    )
}

export default CryptoSwap;