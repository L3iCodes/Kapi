import { Icon } from '@iconify/react'

export default function Search(){
    return(
        <div className="flex w-full items-center px-1 bg-secondary rounded-[5px] h-[35px]">
            <input type="text" placeholder="Search Product" className="w-full"/>
            <Icon icon="material-symbols:search" width="20" height="20" className='text-subtext' />
        </div>
    )
}