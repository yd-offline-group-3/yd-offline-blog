import { types, Instance } from 'mobx-state-tree';

export interface IHeaderModel extends Instance<typeof HeaderModel> { }
export const HeaderModel = types
    .model('HeaderModel', {
        title: types.optional(types.string, '京程一灯'),
        subTitle: types.optional(types.string, '专注于国内外大前端前沿技术，分享技术文章、工具资源、前端框架、精选项目。'),
    })
    .actions((self) => ({
        setTitle(title?: string, subTitle?: string) {
            self.title = title ?? self.title;
            self.subTitle = subTitle ?? self.subTitle;
        },
    }));
