using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Shared
{
    public abstract class Entity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; private set; }

        public Entity()
        {
        }
    }
}
