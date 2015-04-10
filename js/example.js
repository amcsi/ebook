//var SideChapterList = require("SideChapterList");

//require('./RecursiveSideChapters');

var RecursiveSideChapters = React.createClass({
    
    getIndent: function() {
        var i, length;
        var ret = '';
        for (i = 0, length = this.props.level; i < length; i++) {
            ret += '----';
        }
        ret += '|-';

        return ret;
    },

    render: function () {
        var indent = this.getIndent();
        var i, length, singleChapterData, parts;

        var items = [];
        var nextLevel = parseInt(this.props.level, 10) + 1;

        for (i = 0, length = this.props.chapterData.length; i < length; i++) {
            singleChapterData = this.props.chapterData[i];
            var children = '';
            if (singleChapterData.children && singleChapterData.children.length) {
                children = <RecursiveSideChapters chapterData={singleChapterData.children} level={nextLevel} />;
            }
            items.push(
                <div key={i}>
                    <h4>{indent} {singleChapterData.name}</h4>
                    {children}
                </div>
            );
        }

        return (
            <div>
                {items}
            </div>
        );
    }
});

var SideChapterList = React.createClass({
    getInitialState: function() {
        return {
            chapterData: [
                {
                    key: 0,
                    name: 'Chapter 1',
                    children: [
                        {
                            key: 1,
                            name: 'Chapter 1/A'
                        },
                        {
                            key: 2,
                            name: 'Chapter 2/A',
                            children: [
                                {
                                    key: 3,
                                    name: 'Chapter 2/A/I'
                                }
                            ]
                        }
                    ]
                },
                {
                    key: 4,
                    name: 'Chapter 2'
                }
            ]
        };
    },
    render: function() {
        return (
            <div>
                <RecursiveSideChapters chapterData={this.state.chapterData} level="1" />
            </div>
        );
    }
});

React.render(<SideChapterList />, document.getElementById('chaptersCol'));