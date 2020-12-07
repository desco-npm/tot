import Service from '@/plugins/Service'

class Topic extends Service {
    async listTree (_tree) {
        const tree = _tree ? _tree : await this.list()

        return tree
            .filter(i => i.tree !== false)
            .map(i => {
                if (i.children) {
                    i.children = this.listTree(i.children)
                }

                return i
            })
    }
}

export default new Topic()