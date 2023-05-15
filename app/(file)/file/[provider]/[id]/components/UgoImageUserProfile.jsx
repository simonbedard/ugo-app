
"use client"
import Link from 'next/link';

export default function UgoImageUserProfile({ data  }) {


    return (
        <>
            <table className="w-full my-10">
                <tbody>
                <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="text-muted-foreground border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    Author
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    {data.user.name}
                    </td>
                </tr>
                <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="text-muted-foreground border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    Provider
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    { data.provider }
                    </td>
                </tr>
                <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="text-muted-foreground border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    Size
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    {data.width}x{data.height}
                    </td>
                </tr>
                <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="text-muted-foreground border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    Id
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    {data.id}
                    </td>
                </tr>
                <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="text-muted-foreground border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    Date
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    {data.date.created_at || "Unavailable"}
                    </td>
                </tr>
                <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="text-muted-foreground border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    Downloads
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    {data.downloads}
                    </td>
                </tr>
                </tbody>
            </table>
        </>
    )
}
