

const CryptoItem = ( { icon, name, token, price, setToken }) => {
    return (
        <div className="p-3 w-full h-[50px] rounded-md flex items-center hover:cursor-pointer"
            onClick={() => setToken({icon, token, price})}
        >
            <img src={icon} alt="1" width={35}/>
            <div className="flex justify-between">
                <div className="ml-2">
                    <div className="text-[17px]">{name}</div>
                    <div className="text-gray-400">{token}</div>
                </div>
                <div className="text-gray-500 items-center font-light absolute ml-[360px] text-[25px]">{price}$</div>
            </div>
        </div>
    )
}

export default CryptoItem;