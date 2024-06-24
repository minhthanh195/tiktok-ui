import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import config from '~/config';

import Menu, { MenuItem } from './Menu';
import {
    HomeIcon,
    UserGroupIcon,
    LiveIcon,
    HomeIconActive,
    UserGroupIconActive,
    LiveIconActive,
} from '~/components/Icons';
import SuggestedAccounts from '~/components/SuggestedAccounts';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem
                    title="For Your"
                    to={config.routes.home}
                    icon={<HomeIcon />}
                    iconActive={<HomeIconActive />}
                />

                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    icon={<UserGroupIcon />}
                    iconActive={<UserGroupIconActive />}
                />

                <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} iconActive={<LiveIconActive />} />
                <SuggestedAccounts label="Suggested accounts" />
                <SuggestedAccounts label="Following accounts" />
            </Menu>
        </aside>
    );
}

export default Sidebar;
