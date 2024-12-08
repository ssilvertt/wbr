import BackgroundImages from '@/components/ui/BackgroundImages.tsx';
import qr from '@/assets/qr.webp'
export default function BrowserPage(){
    return(
        <div className='bg-[#151517] w-screen h-screen relative overflow-hidden text-white font-proxima'>
            <BackgroundImages />
            <div className='flex flex-col items-center justify-center h-screen'>
                <p className='text-[32px] font-[800] leading-[120%] text-center z-[100]'>Играть можно только на
                    смартфоне</p>
                <img src={qr} alt='qr'/>
                <p className='text-[15px] font-[800] leading-[120%] text-center z-[100]'>Отсканируйте QR-код, чтобы открыть игру в смартфоне</p>
            </div>
        
        </div>
    );
}