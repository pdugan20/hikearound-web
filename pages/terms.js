import React from 'react';
import { RichText } from 'prismic-reactjs';
import PropTypes from 'prop-types';
import Page from '../layouts/main';
import { getPageData } from '../utils/page';
import { RootView } from '../styles/page';
import FooterSection from '../components/landing/section/Footer';
import DescriptionSection from '../components/terms/section/Description';

const propTypes = {
    title: PropTypes.array.isRequired,
    description: PropTypes.array.isRequired,
    contentOnly: PropTypes.bool,
};

const defaultProps = {
    contentOnly: false,
};

class TermsPage extends React.Component {
    static async getInitialProps(context) {
        const { req, query } = context;
        const page = await getPageData(req, 'terms');

        return {
            title: page.data.title,
            description: page.data.description,
            contentOnly: query.contentOnly,
            namespacesRequired: ['terms', 'common', 'header', 'footer'],
        };
    }

    renderMainColumn = () => {
        const { title, description, contentOnly } = this.props;

        return (
            <RootView>
                <DescriptionSection title={title} description={description} />
                {!contentOnly && <FooterSection />}
            </RootView>
        );
    };

    render() {
        const { title, contentOnly } = this.props;

        return (
            <Page
                singleColumn
                fullWidth
                title={RichText.asText(title)}
                mainColumn={this.renderMainColumn()}
                hideHeader={contentOnly}
                hideFooter={contentOnly}
            />
        );
    }
}

TermsPage.propTypes = propTypes;
TermsPage.defaultProps = defaultProps;

export default TermsPage;
