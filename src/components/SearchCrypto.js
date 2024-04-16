import { Input, Modal } from "antd"
import CryptoItem from "./CryptoItem";

import data from "../data/cryptos.json"
import popdata from "../data/pop_crypto.json"
import pindata from "../data/top_crypto.json"
import PinCryptoItem from "./PinCryptoItem";
import { useEffect, useState } from "react";

const SearchCrypto = ({ open, onClose, setToken }) => {

    const [searchValue, setSearchValue] = useState('');
    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
        const filteredTokens = data.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()));

        setFilteredData(filteredTokens);
    }, [searchValue])

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    }

    return (
        <div>
            <Modal
                title="Selete a token"
                centered
                open={open}
                onCancel={onClose}
                footer={null}
            >
                <Input
                    placeholder="Search token"
                    value={searchValue}
                    onChange={handleSearchChange}
                />

                <div className="p-2">
                    {pindata.map((item) => {
                        return (
                            <PinCryptoItem
                                key={item.token}
                                token={item.token}
                                icon={item.icon}
                                price={item.price}
                                setToken={({ token, icon, price }) => { setToken({ token, icon, price }); onClose(); }}
                            />
                        )
                    })

                    }
                </div>

                <hr className="mb-2" />

                {
                    searchValue === '' ? (
                        popdata.map((item) => {
                            return (
                                <CryptoItem
                                    key={item.token}
                                    name={item.name}
                                    token={item.token}
                                    price={item.price}
                                    icon={item.icon}
                                    setToken={() => { setToken({ token: item.token, icon: item.icon, price: item.price }); onClose(); }}
                                />)
                        })) : (
                        filteredData.map((item) => {
                            return (
                                <CryptoItem
                                    key={item.token}
                                    name={item.name}
                                    token={item.token}
                                    price={item.price}
                                    icon={item.icon}
                                    setToken={() => { setToken({ token: item.token, icon: item.icon, price: item.price }); onClose(); }}
                                />
                            )
                        })
                    )
                }


            </Modal>
        </div>
    )
}

export default SearchCrypto;
