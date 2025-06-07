import PropTypes from 'prop-types';
import LeadItem from './LeadItem';

function LeadList({ leadboards }) {
  return (
    <div>
      {leadboards.map((lead) => (
        <LeadItem key={lead.user.id} score={lead.score} user={lead.user} />
      ))}
    </div>
  );
}
LeadList.propTypes = {
  leadboards: PropTypes.array.isRequired,
};
export default LeadList;
