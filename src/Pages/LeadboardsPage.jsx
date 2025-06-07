import { useDispatch, useSelector } from 'react-redux';
import LeadList from '../Components/LeadList';
import { useEffect } from 'react';
import { asyncReceiveLeadboards } from '../States/leadboards/action';

function LeadboardsPage() {
  const { leaderboards } = useSelector((states) => states);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncReceiveLeadboards());
  }, [dispatch]);
  return (
    <div className="p-4 border border-gray-300 rounded-3xl mx-4 my-4">
      <h1 className="text-2xl font-bold">Kelasmen Pengguna Aktif</h1>
      <div className="flex justify-between text-xl my-2 ">
        <h2>Pengguna</h2>
        <h2>Score</h2>
      </div>
      <LeadList leadboards={leaderboards} />
    </div>
  );
}
export default LeadboardsPage;
