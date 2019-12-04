import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { Card } from '../styles/card';
import { SecondaryHeading } from '../styles/headings';
import { getRecentHikes } from '../utils/hike';
import { RightRailLink } from '../styles/links';
import spacing from '../constants/spacing';

const propTypes = {
    hikeCount: PropTypes.number,
};

const defaultProps = {
    hikeCount: 5,
};

class RecentHikes extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            recentHikes: [],
        };
    }

    async componentDidMount() {
        const { hikeCount } = this.props;
        const recentHikes = await getRecentHikes(hikeCount);

        if (recentHikes) {
            this.setState({ recentHikes });
        }
    }

    renderRecentHikeLinks() {
        const { recentHikes } = this.state;

        return recentHikes.map(({ name, id }, index) => (
            <HikeLinkParent key={index}>
                <Link href={id}>
                    <HikeLink>{name}</HikeLink>
                </Link>
            </HikeLinkParent>
        ));
    }

    render() {
        return (
            <Card>
                <SecondaryHeading>Recent Hikes</SecondaryHeading>
                <HikeLinkContainer>
                    {this.renderRecentHikeLinks()}
                </HikeLinkContainer>
            </Card>
        );
    }
}

RecentHikes.propTypes = propTypes;
RecentHikes.defaultProps = defaultProps;

export default RecentHikes;

const HikeLinkContainer = styled.div`
    margin-top: ${spacing.sm};
`;

const HikeLinkParent = styled.div`
    display: block;
    margin-top: ${spacing.xs};

    &:first-child {
        margin-top: 0;
    }
`;

const HikeLink = styled(RightRailLink)`
    margin: 0;
`;
