import { forwardRef } from 'react';
import { RequestTypes } from '../forms/ManageBloodRequestForm';
import { BloodBankDataTypes } from '../forms/SettingsForm';
import { getMonthName } from '@/lib/months';

type Props = {
    allRequests: RequestTypes[],
    pendingRequests: RequestTypes[],
    bloodBank: BloodBankDataTypes,
    filterYear: number,
    filterMonth: number
}

export const RequestReportToPrint = forwardRef<HTMLDivElement, Props>(({ allRequests, pendingRequests, bloodBags, filterYear, filterMonth }, ref) => {
    return (
        <div ref={ref} className="w-full mx-auto p-16">
            <div>
                {/* Top bar  */}
                <div className='flex justify-between items-start border-b-2 border-black pb-3'>
                    <div className=''>
                        <h1 className='font-bold text-3xl'>Request Report</h1>
                        <h2 className='text-xl font-bold text-slate-400'>
                            {filterYear} - {getMonthName(filterMonth)}
                        </h2>
                        <h2>Generated on: {new Date().toDateString()}</h2>
                    </div>
                    <div className=''>
                        <div className='flex gap-2'>
                            <img src="https://cpts-nk.org/wp-content/uploads/2024/06/CPTS-NK-logo.png" className='w-[100px]' alt="C.P.T.S Logo" />
                            <div className='flex flex-col'>
                                <span className='font-bold text-lg'>C.P.T.S</span>
                                <span className='text-gray-500'>Banque de Sang</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Report content */}
                <div className='flex flex-col w-full'>
                    <h2>Received Requests</h2>
                    <table className='mt-8'>
                        <thead className='bg-gray-400'>
                            <tr>
                                <th className='text-left'>Hospital</th>
                                <th className='text-left'>Recieved On</th>
                                <th className='text-left'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allRequests.map((request, index) => (
                                <tr key={index} className='border-b'>
                                    <td>{request.hospital?.name}</td>
                                    <td>{request.createdAt ? new Date(request.createdAt).toDateString() : ''}</td>
                                    <td>{request.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h2 className=''>Pending Requests</h2>
                    <table className='mt-8'>
                        <thead className='bg-gray-400'>
                            <tr>
                                <th className='text-left'>Hospital</th>
                                <th className='text-left'>Recieved On</th>
                                <th className='text-left'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingRequests.map((request, index) => (
                                <tr key={index} className='border-b'>
                                    <td>{request.hospital?.name}</td>
                                    <td>{request.createdAt ? new Date(request.createdAt).toDateString() : ''}</td>
                                    <td>{request.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer  */}
                <p className='mt-16 text-sm text-slate-800'>Copyright {new Date().getFullYear()} &copy; C.P.T.S. All Rights Reserved.</p>
            </div>
        </div>
    )
})