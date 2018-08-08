/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const MarkdownBlock = CompLibrary.MarkdownBlock;
/* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(process.cwd() + '/siteConfig.js');

function imgUrl(img) {
    return siteConfig.baseUrl + 'img/' + img;
}

function docUrl(doc, language) {
    return siteConfig.baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
}

function pageUrl(page, language) {
    return siteConfig.baseUrl + (language ? language + '/' : '') + page;
}

class Button extends React.Component {
    render() {
        return (
            <div className="pluginWrapper buttonWrapper">
                <a className="button" href={this.props.href} target={this.props.target}>
                    {this.props.children}
                </a>
            </div>
        );
    }
}

Button.defaultProps = {
    target: '_self',
};

const SplashContainer = props => (
    <div className="homeContainer">
        <div className="homeSplashFade">
            <div className="wrapper homeWrapper">{props.children}</div>
        </div>
    </div>
);

const Logo = props => (
    <div className="projectLogo">
        <img src={props.img_src}/>
    </div>
);

const ProjectTitle = props => (
    <h2 className="projectTitle">
        {siteConfig.title}
        <small>{siteConfig.tagline}</small>
    </h2>
);

const PromoSection = props => (
    <div className="section promoSection">
        <div className="promoRow">
            <div className="pluginRowBlock">{props.children}</div>
        </div>
    </div>
);

class HomeSplash extends React.Component {
    render() {
        let language = this.props.language || '';
        return (
            <SplashContainer>
                <Logo img_src={imgUrl('icon.png')}/>
                <div className="inner">
                    <ProjectTitle/>
                    <PromoSection>
                        <Button href="#try">Try It Out</Button>
                        <Button href="https://github.com/sspipe/sspipe">Find Out More</Button>
                        <Button href="https://github.com/sspipe/sspipe/issues/new">Feedback / Ask Question</Button>
                    </PromoSection>
                </div>
            </SplashContainer>
        );
    }
}

const Block = ({id, background, children, layout, gridProps = {}}) => (
    <Container
        padding={['bottom', 'top']}
        id={id}
        background={background}>
        <GridBlock align="center" contents={children} layout={layout} {...gridProps} />
    </Container>
);

const Features = props => (
    <Block layout="twoColumn" gridProps={{className: 'largerImages'}}>
        {[
            {
                content: "Don't waste time on navigating along expressions to fix mismatched parentheses.<br/>Just start from initial data and  append transformations, one after another.",
                image: imgUrl('productivity.png'),
                imageAlign: 'top',
                title: 'Increase Productivity',
            },
            {
                content: "<code>code.reading() | from_left_to_right() | is('easy')</code><br/>but <code>is(from_right_to_left(code.reading()), 'hard')</code>",
                image: imgUrl('readability.png'),
                imageAlign: 'top',
                title: 'Increase Readability',
            },
        ]}
    </Block>
);

const FeatureCallout = props => (
    <div
        className="productShowcaseSection paddingBottom"
        style={{textAlign: 'center'}}>
        <h2>Feature Callout</h2>
        <MarkdownBlock>These are features of this project</MarkdownBlock>
    </div>
);

const LearnHow = props => (
    <Block background="light">
        {[
            {
                content: 'Talk about learning how to use this',
                image: imgUrl('icon.png'),
                imageAlign: 'right',
                title: 'Learn How',
            },
        ]}
    </Block>
);

const TryOut = props => (
    <Block id="try">
        {[
            {
                content: 'Talk about trying this out',
                image: imgUrl('icon.png'),
                imageAlign: 'left',
                title: 'Try it Out',
            },
        ]}
    </Block>
);

const Description = props => (
    <Block background="dark">
        {[
            {
                content: 'This is another description of how this project is useful',
                image: imgUrl('icon.png'),
                imageAlign: 'right',
                title: 'Description',
            },
        ]}
    </Block>
);

const Showcase = props => {
    if ((siteConfig.users || []).length === 0) {
        return null;
    }
    const showcase = siteConfig.users
        .filter(user => {
            return user.pinned;
        })
        .map((user, i) => {
            return (
                <a href={user.infoLink} key={i}>
                    <img src={user.image} alt={user.caption} title={user.caption}/>
                </a>
            );
        });

    return (
        <div className="productShowcaseSection paddingBottom">
            <h2>{"Who's Using This?"}</h2>
            <p>This project is used by all these people</p>
            <div className="logos">{showcase}</div>
            <div className="more-users">
                <a className="button" href={pageUrl('users.html', props.language)}>
                    More {siteConfig.title} Users
                </a>
            </div>
        </div>
    );
};

class Index extends React.Component {
    render() {
        let language = this.props.language || '';

        return (
            <div>
                <HomeSplash language={language}/>
                <div className="mainContainer">
                    <Features/>
                    <div id="try" className="productShowcaseSection">
                        <h2>Try it Out</h2>
                        <iframe height="700px" width="100%" src="https://repl.it/@mhsekhavat/SSPipe-Demo?lite=true"
                                scrolling="no" frameBorder="no" allowtransparency="true" allowFullScreen="true"
                                sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
                    </div>
                    {/*<FeatureCallout />
          <LearnHow />
          <TryOut />
          <Description />
          <Showcase language={language} />*/}
                </div>
            </div>
        );
    }
}

module.exports = Index;
