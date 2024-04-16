const PinCryptoItem = ({token, icon, price, setToken}) => {

    return (
        <div className="inline-flex border rounded-full px-2 py-1 mr-2 my-1 hover:cursor-pointer hover:bg-gray-100" onClick={() => setToken({ token, icon, price})}>
            <div className="flex items-center">
                <img src={icon} alt={token} width={25}/>
                <div className="text-[17px] mb-1 ml-1">{token}</div>
            </div>
        </div>
    )
}

export default PinCryptoItem