import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/authOptions"
import { fetchCover, fetchPopularNewTitle } from '@/lib/data'
import Image from 'next/image'
import jp from 'image/jp.svg'
import kr from 'image/kr.svg'
import cn from 'image/cn.svg'
import hk from 'image/hk.svg'
import gb from 'image/gb.svg'
import Link from 'next/link'

function getCoverArtInfo(relationships: any[]) {
    const coverArt = relationships.find(rel => rel.type === "cover_art")
    return coverArt ? coverArt.id : null
}

export default async function Mangadex() {
    await getServerSession(authOptions)
    const { data } = await fetchPopularNewTitle()

    const covers = await Promise.all(
        data.map(async (komik: { relationships: any[]; id: string }) => {
            const coverId = getCoverArtInfo(komik.relationships)
            if (coverId) {
                const cover = await fetchCover(komik.id, coverId)
                return {
                    ...komik,
                    cover,
                }
            }
            return komik
        })
    )

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-6 gap-4">
                {covers.map((komik) => (
                    <Link key={komik.id} href={`mangadex/manga/${komik.id}`} passHref>
                        <div className="card bg-base-100 w-full shadow-xl h-80 cursor-pointer">
                            {komik.cover && (
                                <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-2 pb-2 pt-4 h-full">
                                    <img 
                                        src={komik.cover} 
                                        alt={komik.attributes.title.en} 
                                        className="absolute inset-0 h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                                    
                                    <div className="z-10 gap-y-1 overflow-hidden text-base leading-6 text-gray-300">
                                        {komik.attributes.originalLanguage === 'ja' && (
                                            <Image src={jp} alt='Manga' width={24} height={24} className="z-10 inline-block mr-1" />
                                        )}
                                        {komik.attributes.originalLanguage === 'ko' && (
                                            <Image src={kr} alt='Manhwa' width={24} height={24} className="z-10 inline-block mr-1" />
                                        )}
                                        {komik.attributes.originalLanguage === 'cn' && (
                                            <Image src={cn} alt='Other' width={24} height={24} className="z-10 inline-block mr-1" />
                                        )}
                                        {komik.attributes.originalLanguage === 'hk' && (
                                            <Image src={hk} alt='Other' width={24} height={24} className="z-10 inline-block mr-1" />
                                        )}
                                        {komik.attributes.originalLanguage === 'gb' && (
                                            <Image src={gb} alt='Other' width={24} height={24} className="z-10 inline-block mr-1" />
                                        )}
                                        <span>{komik.attributes.title.en}</span>
                                    </div>
                                </article>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}