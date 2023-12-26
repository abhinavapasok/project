import RankList from "../../components/RankList";
function ViewRankList() {
  return (
    <div className="w-11/12">
      <div className="flex items-center justify-between w-4/12">
        <select className="p-3 ring-slate-200 ring-2 rounded-xl outline-none">
          <option value="mh">Mens Hostel</option>
          <option value="lh">Ladies Hostel</option>
        </select>
        <select className="p-3 ring-slate-200 ring-2 rounded-xl outline-none">
          <option value="firstyear">First Year</option>
          <option value="secondyear">Second Year</option>
          <option value="thirdyear">Third Year</option>
          <option value="fourthyear">Fourth Year</option>
        </select>
      </div>
      <div className="flex items-center justify-end mb-5">
        <button className="bg-stone-800 text-white p-2 rounded-lg text-sm mr-5">
          Download as Excel
        </button>
        <button className="bg-stone-800 text-white p-2 rounded-lg text-sm">
          Publish Rank List
        </button>
      </div>
      <RankList />
    </div>
  );
}

export default ViewRankList;
