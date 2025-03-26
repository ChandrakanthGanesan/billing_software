import { useLocation } from 'react-router-dom';

function Invoice() {
    const location = useLocation();
    const { tableData = [], total = 0 } = location.state || {};

    return (
        <>
            <h1>Invoice</h1>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>S.NO</th>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Rate</th>
                        <th>GST Rate</th>
                        <th>GST Amount</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{row.itemName}</td>
                            <td>{row.quantity}</td>
                            <td>{row.rate}</td>
                            <td>{row.gstrate}</td>
                            <td>{row.gstAmount}</td>
                            <td>{row.totalprice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3>Total: ₹{total}</h3>
            <button className='btn btn-primary' onClick={() => window.print()}>Print</button>
        </>
    );
}

export default Invoice;
