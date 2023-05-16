using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using steamy.api.Data;
using steamy.api.Models;

namespace steamy.api.Controllers
{
    [Authorize]
[Route("api/[controller]")]
[ApiController]
public class NotesController : ControllerBase
{
    private readonly UserDbContext _context;

    public NotesController(UserDbContext context)
    {
        _context = context;
    }

    // GET: api/Notes
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Note>>> GetNotes()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); 
        return await _context.Notes.Where(n => n.UserId == userId).ToListAsync();
    }

    // GET: api/Notes/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Note>> GetNote(int id)
    {
        var note = await _context.Notes.FindAsync(id);

        if (note == null)
        {
            return NotFound();
        }

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); 

        if (note.UserId != userId)
        {
            return Forbid();
        }

        return note;
    }

    // PUT: api/Notes/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutNote(int id, Note note)
    {
        if (id != note.Id)
        {
            return BadRequest();
        }

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); 

        if (note.UserId != userId)
        {
            return Forbid();
        }

        _context.Entry(note).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!NoteExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // POST: api/Notes
    [HttpPost]
    public async Task<ActionResult<Note>> PostNote(Note note)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); 

        note.UserId = userId;

        _context.Notes.Add(note);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetNote", new { id = note.Id }, note);
    }

    // DELETE: api/Notes/5
    [HttpDelete("{id}")]
    public async Task<ActionResult<Note>> DeleteNote(int id)
    {
        var note = await _context.Notes.FindAsync(id);
        if (note == null)
        {
            return NotFound();
        }

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); 

        if (note.UserId != userId)
        {
            return Forbid();
        }

        _context.Notes.Remove(note);
        await _context.SaveChangesAsync();

        return note;
    }

    private bool NoteExists(int id)
    {
        return _context.Notes.Any(e => e.Id == id);
    }
}
}